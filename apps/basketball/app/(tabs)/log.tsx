import { useState } from "react"
import { Text, View } from "react-native"
import { router } from "expo-router"
import { ScreenContainer, TextField, Button, Card, Chip, useTheme } from "@athlete/ui"
import { useCreateBasketballSession } from "../../lib/queries"
import type { Enums } from "@athlete/types"

const SESSION_TYPES: Enums<"basketball_session_type">[] = [
  "practice",
  "game",
  "shooting",
  "drills",
  "conditioning",
]

export default function LogSession() {
  const theme = useTheme()
  const createSession = useCreateBasketballSession()
  const [sessionType, setSessionType] = useState<Enums<"basketball_session_type">>("practice")
  const [duration, setDuration] = useState("60")
  const [shotsMade, setShotsMade] = useState("")
  const [shotsAttempted, setShotsAttempted] = useState("")
  const [pointsScored, setPointsScored] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setError(null)
    try {
      await createSession.mutateAsync({
        session_type: sessionType,
        duration_min: Number(duration) || 0,
        shots_made: shotsMade ? Number(shotsMade) : null,
        shots_attempted: shotsAttempted ? Number(shotsAttempted) : null,
        points_scored: pointsScored ? Number(pointsScored) : null,
        notes: notes || null,
      })
      setDuration("60")
      setShotsMade("")
      setShotsAttempted("")
      setPointsScored("")
      setNotes("")
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
      <Button title="Save Session" onPress={handleSubmit} loading={createSession.isPending} />
    </ScreenContainer>
  )
}
