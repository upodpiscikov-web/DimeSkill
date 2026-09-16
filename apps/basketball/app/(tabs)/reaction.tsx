import { useEffect, useRef, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { ScreenContainer, Card, Button, useTheme } from "@athlete/ui"
import { useCreateReactionResult, useReactionDrillResults } from "../../lib/queries"

const COLORS = [
  { name: "Red", value: "#FF5C5C" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#3DDC97" },
  { name: "Yellow", value: "#F5C518" },
]

const TOTAL_ROUNDS = 8

type Phase = "idle" | "waiting" | "active" | "done"

export default function ReactionDrill() {
  const theme = useTheme()
  const createResult = useCreateReactionResult()
  const { data: history } = useReactionDrillResults()

  const [phase, setPhase] = useState<Phase>("idle")
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState(COLORS[0])
  const [order, setOrder] = useState(COLORS)
  const [times, setTimes] = useState<number[]>([])
  const startedAt = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  function startGame() {
    setTimes([])
    setRound(0)
    beginRound()
  }

  function beginRound() {
    setPhase("waiting")
    const delay = 800 + Math.random() * 1800
    timeoutRef.current = setTimeout(() => {
      const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
      const chosen = shuffled[Math.floor(Math.random() * shuffled.length)]
      setOrder(shuffled)
      setTarget(chosen)
      startedAt.current = Date.now()
      setPhase("active")
    }, delay)
  }

  function handlePress(colorName: string) {
    if (phase !== "active") return
    const reactionMs = Date.now() - startedAt.current
    const isCorrect = colorName === target.name
    const updatedTimes = isCorrect ? [...times, reactionMs] : times

    setTimes(updatedTimes)
    const next = round + 1
    setRound(next)

    if (next >= TOTAL_ROUNDS) {
      finishGame(updatedTimes)
    } else {
      beginRound()
    }
  }

  function finishGame(finalTimes: number[]) {
    setPhase("done")
    if (finalTimes.length === 0) return
    const avg = Math.round(finalTimes.reduce((a, b) => a + b, 0) / finalTimes.length)
    const best = Math.min(...finalTimes)
    const accuracy = Math.round((finalTimes.length / TOTAL_ROUNDS) * 100)
    createResult.mutate({
      attempts: TOTAL_ROUNDS,
      avg_reaction_ms: avg,
      best_reaction_ms: best,
      accuracy_pct: accuracy,
    })
  }

  return (
    <ScreenContainer>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Reaction Speed Drill
      </Text>
      <Text style={{ color: theme.textMuted }}>
        Tap the button matching the target color as fast as you can. {TOTAL_ROUNDS} rounds.
      </Text>

      {phase === "idle" && <Button title="Start Drill" onPress={startGame} />}

      {phase === "waiting" && (
        <Card style={{ alignItems: "center", paddingVertical: theme.spacing(4) }}>
          <Text style={{ color: theme.textMuted }}>Get ready...</Text>
        </Card>
      )}

      {phase === "active" && (
        <>
          <Card style={{ alignItems: "center" }}>
            <Text style={{ color: theme.textMuted }}>Tap</Text>
            <Text style={{ color: target.value, fontSize: theme.fontSize.xxl, fontWeight: "800" }}>
              {target.name}
            </Text>
          </Card>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1.5) }}>
            {order.map((color) => (
              <Pressable
                key={color.name}
                onPress={() => handlePress(color.name)}
                accessibilityRole="button"
                accessibilityLabel={`Tap ${color.name}`}
                style={{
                  flexBasis: "47%",
                  aspectRatio: 1.6,
                  backgroundColor: color.value,
                  borderRadius: theme.radius.lg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#111318", fontWeight: "700" }}>{color.name}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={{ color: theme.textMuted }}>
            Round {round + 1} / {TOTAL_ROUNDS}
          </Text>
        </>
      )}

      {phase === "done" && (
        <Card>
          <Text style={{ color: theme.text, fontWeight: "700", fontSize: theme.fontSize.lg }}>
            {times.length > 0 ? "Nice work!" : "No correct taps that round - try again"}
          </Text>
          {times.length > 0 && (
            <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
              Avg: {Math.round(times.reduce((a, b) => a + b, 0) / times.length)}ms · Best:{" "}
              {Math.min(...times)}ms · Accuracy: {Math.round((times.length / TOTAL_ROUNDS) * 100)}%
            </Text>
          )}
          <Button title="Go Again" onPress={startGame} />
        </Card>
      )}

      {history && history.length > 0 && phase === "idle" && (
        <Card>
          <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
            Recent Results
          </Text>
          <View style={{ gap: theme.spacing(0.5) }}>
            {history.slice(0, 5).map((r) => (
              <Text key={r.id} style={{ color: theme.textMuted }}>
                Avg {r.avg_reaction_ms}ms · Best {r.best_reaction_ms}ms · {r.accuracy_pct}% accurate
              </Text>
            ))}
          </View>
        </Card>
      )}
    </ScreenContainer>
  )
}
