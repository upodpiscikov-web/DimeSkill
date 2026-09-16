import { FlatList, Text, View } from "react-native"
import { ScreenContainer, Card, Badge, useTheme } from "@athlete/ui"
import { useGymSessions, useMilestones } from "../../lib/queries"

export default function History() {
  const theme = useTheme()
  const { data: sessions, isLoading } = useGymSessions()
  const { data: milestones } = useMilestones()

  return (
    <ScreenContainer scroll={false}>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Session History
      </Text>

      {milestones && milestones.length > 0 && (
        <Card>
          <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
            Personal Records
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
            {milestones.slice(0, 6).map((m) => (
              <Badge key={m.id} label={`${m.label}: ${m.current_value}kg`} tone="accent" />
            ))}
          </View>
        </Card>
      )}

      <FlatList
        data={sessions ?? []}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing(1.5) }} />}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={{ color: theme.textMuted }}>No sessions logged yet.</Text>
          ) : null
        }
        renderItem={({ item }: { item: any }) => (
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: theme.text, fontWeight: "600", textTransform: "capitalize" }}>
                {item.session_type.replace("_", " ")}
              </Text>
              <Text style={{ color: theme.textMuted }}>{item.session_date}</Text>
            </View>
            <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
              {item.duration_min ? `${item.duration_min} min` : ""}
              {item.rpe ? ` · RPE ${item.rpe}` : ""}
            </Text>
            {item.gym_exercise_sets && item.gym_exercise_sets.length > 0 && (
              <View style={{ marginTop: theme.spacing(1), gap: theme.spacing(0.25) }}>
                {item.gym_exercise_sets.map((set: any) => (
                  <Text key={set.id} style={{ color: theme.textMuted }}>
                    {set.exercise_name} — set {set.set_number}: {set.reps ?? "-"} reps
                    {set.weight_kg ? ` @ ${set.weight_kg}kg` : ""}
                  </Text>
                ))}
              </View>
            )}
            {item.notes ? (
              <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
                {item.notes}
              </Text>
            ) : null}
          </Card>
        )}
      />
    </ScreenContainer>
  )
}
