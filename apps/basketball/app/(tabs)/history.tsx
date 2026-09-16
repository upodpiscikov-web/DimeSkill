import { FlatList, Text, View } from "react-native"
import { ScreenContainer, Card, useTheme } from "@athlete/ui"
import { useBasketballSessions } from "../../lib/queries"

export default function History() {
  const theme = useTheme()
  const { data: sessions, isLoading } = useBasketballSessions()

  return (
    <ScreenContainer scroll={false}>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Session History
      </Text>
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
        renderItem={({ item }) => (
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: theme.text, fontWeight: "600", textTransform: "capitalize" }}>
                {item.session_type}
              </Text>
              <Text style={{ color: theme.textMuted }}>{item.session_date}</Text>
            </View>
            <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
              {item.duration_min} min
              {item.shots_made != null && item.shots_attempted
                ? ` · ${item.shots_made}/${item.shots_attempted} shots (${Math.round(
                    (item.shots_made / item.shots_attempted) * 100
                  )}%)`
                : ""}
            </Text>
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
