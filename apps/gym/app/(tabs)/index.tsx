import { Text, View } from "react-native"
import { ScreenContainer, Card, StatRow, StatTile, Badge, useTheme } from "@athlete/ui"
import { useGymSessions, useProfile, useUserAchievements } from "../../lib/queries"

export default function Home() {
  const theme = useTheme()
  const { data: sessions } = useGymSessions()
  const { data: profile } = useProfile()
  const { data: earned } = useUserAchievements()

  const sessionCount = sessions?.length ?? 0
  const thisWeekCount =
    sessions?.filter((s) => {
      const diffDays = (Date.now() - new Date(s.session_date).getTime()) / 86400000
      return diffDays <= 7
    }).length ?? 0
  const target = profile?.weekly_session_target ?? 3

  return (
    <ScreenContainer>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xxl, fontWeight: "700" }}>
        {profile?.display_name ? `Hey, ${profile.display_name}` : "Welcome"}
      </Text>
      <StatRow>
        <StatTile label="This Week" value={`${thisWeekCount}/${target}`} accent />
        <StatTile label="Total Sessions" value={String(sessionCount)} />
      </StatRow>
      <Card>
        <Text
          style={{
            color: theme.text,
            fontSize: theme.fontSize.md,
            fontWeight: "600",
            marginBottom: theme.spacing(1),
          }}
        >
          Recent Achievements
        </Text>
        {earned && earned.length > 0 ? (
          <View style={{ gap: theme.spacing(1) }}>
            {earned.slice(0, 5).map((ua: any) => (
              <Badge key={ua.id} label={ua.achievement?.title ?? "Achievement"} tone="accent" />
            ))}
          </View>
        ) : (
          <Text style={{ color: theme.textMuted }}>
            Log your first session to start earning achievements.
          </Text>
        )}
      </Card>
    </ScreenContainer>
  )
}
