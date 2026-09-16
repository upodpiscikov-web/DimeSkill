import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { router } from "expo-router"
import { ScreenContainer, TextField, Button, Card, Chip, useTheme } from "@athlete/ui"
import { useCreateGymSession } from "../../lib/queries"
import type { Enums } from "@athlete/types"

const SESSION_TYPES: Enums<"gym_session_type">[] = [
  "strength",
  "cardio",
  "mobility",
  "sport_specific",
]

type SetRow = { reps: string; weight: string }

export default function LogSession() {
  const theme = useTheme()
  const createSession = useCreateGymSession()
  const [sessionType, setSessionType] = useState<Enums<"gym_session_type">>("strength")
  const [duration, setDuration] = useState("60")
  const [rpe, setRpe] = useState("")
  const [notes, setNotes] = useState("")
  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState<SetRow[]>([{ reps: "", weight: "" }])
  const [error, setError] = useState<string | null>(null)

  function updateSet(index: number, field: keyof SetRow, value: string) {
    setSets((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  function addSet() {
    setSets((prev) => [...prev, { reps: "", weight: "" }])
  }

  function removeSet(index: number) {
    setSets((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    setError(null)
    try {
      const trimmedName = exerciseName.trim()
      const validSets =
        trimmedName.length > 0
          ? sets
              .map((s, i) => ({
                exercise_name: trimmedName,
                set_number: i + 1,
                reps: s.reps ? Number(s.reps) : null,
                weight_kg: s.weight ? Number(s.weight) : null,
              }))
              .filter((s) => s.reps != null || s.weight_kg != null)
          : []

      await createSession.mutateAsync({
        session: {
          session_type: sessionType,
          duration_min: Number(duration) || null,
          rpe: rpe ? Number(rpe) : null,
          notes: notes || null,
        },
        sets: validSets,
      })

      setDuration("60")
      setRpe("")
      setNotes("")
      setExerciseName("")
      setSets([{ reps: "", weight: "" }])
      router.push("/(tabs)/history")
    } catch (e: any) {
      setError(e.message ?? "Something went wrong")
    }
  }

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
              label={type.replace("_", " ")}
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
        label="RPE (1-10)"
        value={rpe}
        onChangeText={setRpe}
        keyboardType="numeric"
        placeholder="optional"
      />

      <Card>
        <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
          Exercise
        </Text>
        <TextField
          label="Exercise Name"
          value={exerciseName}
          onChangeText={setExerciseName}
          placeholder="e.g. Bench Press"
        />
        <View style={{ gap: theme.spacing(1), marginTop: theme.spacing(1.5) }}>
          {sets.map((set, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", gap: theme.spacing(1), alignItems: "flex-end" }}
            >
              <View style={{ flex: 1 }}>
                <TextField
                  label={`Set ${index + 1} reps`}
                  value={set.reps}
                  onChangeText={(v) => updateSet(index, "reps", v)}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1 }}>
                <TextField
                  label="Weight (kg)"
                  value={set.weight}
                  onChangeText={(v) => updateSet(index, "weight", v)}
                  keyboardType="numeric"
                />
              </View>
              {sets.length > 1 && (
                <Pressable
                  onPress={() => removeSet(index)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove set ${index + 1}`}
                  style={{ padding: theme.spacing(1) }}
                >
                  <Text style={{ color: theme.danger }}>Remove</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
        <Button title="+ Add Set" variant="ghost" onPress={addSet} />
      </Card>

      <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="optional" multiline />
      {error && <Text style={{ color: theme.danger }}>{error}</Text>}
      <Button title="Save Session" onPress={handleSubmit} loading={createSession.isPending} />
    </ScreenContainer>
  )
}
