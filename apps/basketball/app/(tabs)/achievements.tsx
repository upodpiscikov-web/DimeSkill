import { FlatList, RefreshControl, Text, View } from "react-native"
import { ScreenContainer, Card, Badge, useTheme } from "@athlete/ui"
import { useAllAchievements, useUserAchievements } from "../../lib/queries"

export default function Achievements() {
  const theme = useTheme()
  const { data: all, isRefetching: refetchingAll, refetch: refetchAll } = useAllAchievements()
  const { data: earned, refetch: refetchEarned } = useUserAchievements()
  const earnedIds = new Set((earned ?? []).map((e: any) => e.achievement_id))

  return (
    <ScreenContainer scroll={false}>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Achievements
      </Text>
      <FlatList
        data={all ?? []}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refetchingAll}
            onRefresh={() => {
              refetchAll()
              refetchEarned()
            }}
            tintColor={theme.accent}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing(1.5) }} />}
        renderItem={({ item }) => {
          const unlocked = earnedIds.has(item.id)
          return (
            <Card style={{ opacity: unlocked ? 1 : 0.5 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: theme.text, fontWeight: "600" }}>{item.title}</Text>
                <Badge label={unlocked ? "Unlocked" : "Locked"} tone={unlocked ? "success" : "neutral"} />
              </View>
              <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
                {item.description}
              </Text>
            </Card>
          )
        }}
      />
    </ScreenContainer>
  )
}
