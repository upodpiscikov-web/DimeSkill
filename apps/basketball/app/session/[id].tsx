import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { Button, Card, Chip, ScreenContainer, TextField, useTheme } from "@athlete/ui"
import type { Enums } from "@athlete/types"
import {
  useBasketballDrills,
  useBasketballSession,
  useDeleteBasketballSession,
  useUpdateBasketballSession,
} from "../../lib/queries"

const SESSION_TYPES: Enums<"basketball_session_type">[] = [
  "practice",
  "game",
  "shooting",
  "drills",
  "conditioning",
]

export default function SessionDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const theme = useTheme()
  const { data: sessionRow } = useBasketballSession(id)
  const { data: drills } = useBasketballDrills(id)
  const updateSession = useUpdateBasketballSession()
  const deleteSession = useDeleteBasketballSession()

  const [editing, setEditing] = useState(false)
  const [sessionType, setSessionType] = useState<Enums<"basketball_session_type">>("practice")
  const [duration, setDuration] = useState("")
  const [shotsMade, setShotsMade] = useState("")
  const [shotsAttempted, setShotsAttempted] = useState("")
  const [pointsScored, setPointsScored] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  useEffect(() => {
    if (!sessionRow) return
    setSessionType(sessionRow.session_type)
    setDuration(String(sessionRow.duration_min))
    setShotsMade(sessionRow.shots_made != null ? String(sessionRow.shots_made) : "")
    setShotsAttempted(sessionRow.shots_attempted != null ? String(sessionRow.shots_attempted) : "")
    setPointsScored(sessionRow.points_scored != null ? String(sessionRow.points_scored) : "")
    setNotes(sessionRow.notes ?? "")
  }, [sessionRow])

  async function handleSave() {
    setError(null)
    const made = shotsMade ? Number(shotsMade) : null
    const attempted = shotsAttempted ? Number(shotsAttempted) : null
    if (made != null && attempted != null && made > attempted) {
      setError("Shots made can't exceed shots attempted.")
      return
    }
    if (!duration || Number(duration) <= 0) {
      setError("Duration must be greater than 0.")
      return
    }
    try {
      await updateSession.mutateAsync({
        id: id!,
        session_type: sessionType,
        duration_min: Number(duration),
        shots_made: made,
        shots_attempted: attempted,
        points_scored: pointsScored ? Number(pointsScored) : null,
        notes: notes || null,
      })
      setEditing(false)
    } catch (e: any) {
      setError(e.message ?? "Something went wrong")
    }
  }

  async function handleDelete() {
    try {
      await deleteSession.mutateAsync(id!)
      router.replace("/(tabs)/history")
    } catch (e: any) {
      setError(e.message ?? "Something went wrong")
    }
  }

  if (!sessionRow) {
    return (
      <ScreenContainer>
        <Text style={{ color: theme.textMuted }}>Loading…</Text>
      </ScreenContainer>
    )
  }

  const shootingPct =
    sessionRow.shots_made != null && sessionRow.shots_attempted
      ? Math.round((sessionRow.shots_made / sessionRow.shots_attempted) * 100)
      : null

  return (
    <ScreenContainer>
      <Text
        onPress={() => router.back()}
        style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}
      >
        ‹ Back to History
      </Text>

      {!editing ? (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text
              style={{
                color: theme.text,
                fontSize: theme.fontSize.xl,
                fontWeight: "700",
                fontFamily: theme.fontFamily.extrabold,
                textTransform: "capitalize",
              }}
            >
              {sessionRow.session_type}
            </Text>
            <Text style={{ color: theme.textMuted }}>{sessionRow.session_date}</Text>
          </View>
          <Card>
            <Text style={{ color: theme.textMuted }}>Duration</Text>
            <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
              {sessionRow.duration_min} min
            </Text>
            {sessionRow.shots_attempted != null && (
              <>
                <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>Shooting</Text>
                <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
                  {sessionRow.shots_made ?? 0}/{sessionRow.shots_attempted} ({shootingPct}%)
                </Text>
              </>
            )}
            {sessionRow.points_scored != null && (
              <>
                <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
                  Points Scored
                </Text>
                <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
                  {sessionRow.points_scored}
                </Text>
              </>
            )}
            {sessionRow.notes && (
              <>
                <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>Notes</Text>
                <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
                  {sessionRow.notes}
                </Text>
              </>
            )}
          </Card>

          {drills && drills.length > 0 && (
            <Card>
              <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
                Drills
              </Text>
              <View style={{ gap: theme.spacing(1) }}>
                {drills.map((drill) => (
                  <View key={drill.id}>
                    <Text style={{ color: theme.text }}>{drill.drill_name}</Text>
                    <Text style={{ color: theme.textMuted }}>
                      {[
                        drill.reps != null ? `${drill.reps} reps` : null,
                        drill.makes != null ? `${drill.makes} makes` : null,
                        drill.duration_sec != null ? `${drill.duration_sec}s` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "No details"}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          <Button title="Edit Session" variant="secondary" onPress={() => setEditing(true)} />
          {!confirmingDelete ? (
            <Button
              title="Delete Session"
              variant="ghost"
              onPress={() => setConfirmingDelete(true)}
            />
          ) : (
            <Card>
              <Text style={{ color: theme.text, marginBottom: theme.spacing(1) }}>
                Delete this session? This can't be undone.
              </Text>
              <View style={{ flexDirection: "row", gap: theme.spacing(1) }}>
                <View style={{ flex: 1 }}>
                  <Button
                    title="Cancel"
                    variant="secondary"
                    onPress={() => setConfirmingDelete(false)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button title="Confirm Delete" onPress={handleDelete} loading={deleteSession.isPending} />
                </View>
              </View>
            </Card>
          )}
        </>
      ) : (
        <>
          <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700", fontFamily: theme.fontFamily.extrabold }}>
            Edit Session
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
          <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="optional" multiline />
          {error && <Text style={{ color: theme.danger }}>{error}</Text>}
          <View style={{ flexDirection: "row", gap: theme.spacing(1) }}>
            <View style={{ flex: 1 }}>
              <Button title="Cancel" variant="secondary" onPress={() => setEditing(false)} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Save" onPress={handleSave} loading={updateSession.isPending} />
            </View>
          </View>
        </>
      )}
      {error && !editing && <Text style={{ color: theme.danger }}>{error}</Text>}
    </ScreenContainer>
  )
}
