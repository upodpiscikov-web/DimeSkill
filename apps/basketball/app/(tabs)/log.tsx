import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { router } from "expo-router"
import { ScreenContainer, TextField, Button, Card, Chip, useTheme } from "@athlete/ui"
import { useCreateBasketballSession, useCreateBasketballDrills } from "../../lib/queries"
import type { Enums } from "@athlete/types"

const SESSION_TYPES: Enums<"basketball_session_type">[] = [
  "practice",
  "game",
  "shooting",
  "drills",
  "conditioning",
]

type DrillRow = { name: string; reps: string; makes: string; durationSec: string }

const EMPTY_DRILL: DrillRow = { name: "", reps: "", makes: "", durationSec: "" }

export default function LogSession() {
  const theme = useTheme()
  const createSession = useCreateBasketballSession()
  const createDrills = useCreateBasketballDrills()
  const [sessionType, setSessionType] = useState<Enums<"basketball_session_type">>("practice")
  const [duration, setDuration] = useState("60")
  const [shotsMade, setShotsMade] = useState("")
  const [shotsAttempted, setShotsAttempted] = useState("")
  const [pointsScored, setPointsScored] = useState("")
  const [notes, setNotes] = useState("")
  const [drills, setDrills] = useState<DrillRow[]>([])
  const [error, setError] = useState<string | null>(null)

  function updateDrill(index: number, field: keyof DrillRow, value: string) {
    setDrills((prev) => prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)))
  }

  function removeDrill(index: number) {
    setDrills((prev) => prev.filter((_, i) => i !== index))
  }

  function validate(): string | null {
    const durationNum = Number(duration)
    if (!duration || durationNum <= 0) return "Duration must be greater than 0."
    const made = shotsMade ? Number(shotsMade) : null
    const attempted = shotsAttempted ? Number(shotsAttempted) : null
    if (made != null && made < 0) return "Shots made can't be negative."
    if (attempted != null && attempted < 0) return "Shots attempted can't be negative."
    if (made != null && attempted != null && made > attempted) {
      return "Shots made can't exceed shots attempted."
    }
    if (pointsScored && Number(pointsScored) < 0) return "Points scored can't be negative."
    for (const drill of drills) {
      if (!drill.name.trim()) return "Every drill needs a name, or remove the empty row."
      const drillMakes = drill.makes ? Number(drill.makes) : null
      const drillReps = drill.reps ? Number(drill.reps) : null
      if (drillMakes != null && drillReps != null && drillMakes > drillReps) {
        return `"${drill.name}": makes can't exceed reps.`
      }
    }
    return null
  }

  async function handleSubmit() {
    setError(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    try {
      const created = await createSession.mutateAsync({
        session_type: sessionType,
        duration_min: Number(duration) || 0,
        shots_made: shotsMade ? Number(shotsMade) : null,
        shots_attempted: shotsAttempted ? Number(shotsAttempted) : null,
        points_scored: pointsScored ? Number(pointsScored) : null,
        notes: notes || null,
      })
      const drillRows = drills
        .filter((d) => d.name.trim())
        .map((d) => ({
          session_id: created.id,
          drill_name: d.name.trim(),
          reps: d.reps ? Number(d.reps) : null,
          makes: d.makes ? Number(d.makes) : null,
          duration_sec: d.durationSec ? Number(d.durationSec) : null,
        }))
      if (drillRows.length > 0) {
        await createDrills.mutateAsync(drillRows)
      }
      setDuration("60")
      setShotsMade("")
      setShotsAttempted("")
      setPointsScored("")
      setNotes("")
      setDrills([])
      router.push("/(tabs)/history")
    } catch (e: any) {
      setError(e.message ?? "Something went wrong")
    }
  }

  const isSaving = createSession.isPending || createDrills.isPending

  return (
    <ScreenContainer>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Log a Session
      </Text>
      <Card>
        <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
          Session Type
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
          {SESSION_TYPES.map((type) => (
            <Chip
              key={type}
              label={type}
              selected={sessionType === type}
              onPress={() => setSessionType(type)}
            />
          ))}
        </View>
      </Card>
      <TextField
        label="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextField
        label="Shots Made"
        value={shotsMade}
        onChangeText={setShotsMade}
        keyboardType="numeric"
        placeholder="optional"
      />
      <TextField
        label="Shots Attempted"
        value={shotsAttempted}
        onChangeText={setShotsAttempted}
        keyboardType="numeric"
        placeholder="optional"
      />
      <TextField
        label="Points Scored"
        value={pointsScored}
        onChangeText={setPointsScored}
        keyboardType="numeric"
        placeholder="optional"
      />

      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(1),
          }}
        >
          <Text style={{ color: theme.text, fontWeight: "600" }}>Drills (optional)</Text>
          <Pressable
            onPress={() => setDrills((prev) => [...prev, { ...EMPTY_DRILL }])}
            accessibilityRole="button"
            accessibilityLabel="Add drill"
          >
            <Text style={{ color: theme.accent, fontWeight: "600" }}>+ Add Drill</Text>
          </Pressable>
        </View>
        {drills.length === 0 && (
          <Text style={{ color: theme.textMuted }}>
            Track individual drills like free throws or ball-handling reps.
          </Text>
        )}
        <View style={{ gap: theme.spacing(1.5) }}>
          {drills.map((drill, index) => (
            <View key={index} style={{ gap: theme.spacing(1) }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <TextField
                    label={`Drill ${index + 1} name`}
                    value={drill.name}
                    onChangeText={(v) => updateDrill(index, "name", v)}
                    placeholder="e.g. Free Throws"
                  />
                </View>
                <Pressable
                  onPress={() => removeDrill(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove drill ${index + 1}`}
                  style={{ padding: theme.spacing(1) }}
                >
                  <Text style={{ color: theme.danger }}>Remove</Text>
                </Pressable>
              </View>
              <View style={{ flexDirection: "row", gap: theme.spacing(1) }}>
                <View style={{ flex: 1 }}>
                  <TextField
                    label="Reps"
                    value={drill.reps}
                    onChangeText={(v) => updateDrill(index, "reps", v)}
                    keyboardType="numeric"
                    placeholder="optional"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextField
                    label="Makes"
                    value={drill.makes}
                    onChangeText={(v) => updateDrill(index, "makes", v)}
                    keyboardType="numeric"
                    placeholder="optional"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextField
                    label="Seconds"
                    value={drill.durationSec}
                    onChangeText={(v) => updateDrill(index, "durationSec", v)}
                    keyboardType="numeric"
                    placeholder="optional"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="optional" multiline />
      {error && <Text style={{ color: theme.danger }}>{error}</Text>}
      <Button title="Save Session" onPress={handleSubmit} loading={isSaving} />
    </ScreenContainer>
  )
}
