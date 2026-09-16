import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { router } from "expo-router"
import { ScreenContainer, TextField, Button, Card, useTheme } from "@athlete/ui"
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
        notes: notes || null,
      })
      setDuration("60")
      setShotsMade("")
      setShotsAttempted("")
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
      <TextField label="Notes" value={notes} onChangeText={setNotes} placeholder="optional" multiline />
      {error && <Text style={{ color: theme.danger }}>{error}</Text>}
      <Button title="Save Session" onPress={handleSubmit} loading={createSession.isPending} />
    </ScreenContainer>
  )
}

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string
  selected: boolean
  onPress: () => void
}) {
  const theme = useTheme()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      style={{
        paddingVertical: theme.spacing(0.75),
        paddingHorizontal: theme.spacing(1.5),
        borderRadius: theme.radius.pill,
        backgroundColor: selected ? theme.accent : theme.surfaceAlt,
        borderWidth: 1,
        borderColor: selected ? theme.accent : theme.border,
      }}
    >
      <Text style={{ color: selected ? "#111318" : theme.text, textTransform: "capitalize" }}>
        {label}
      </Text>
    </Pressable>
  )
}
