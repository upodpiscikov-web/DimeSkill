import { Text, View } from "react-native"
import { router } from "expo-router"
import { ScreenContainer, Card, StatRow, StatTile, Badge, Button, useTheme } from "@athlete/ui"
import type { PlanTemplate } from "@athlete/plan-templates"
import {
  useActiveTrainingPlan,
  useBasketballSessions,
  useProfile,
  useUserAchievements,
} from "../../lib/queries"

export default function Home() {
  const theme = useTheme()
  const { data: sessions } = useBasketballSessions()
  const { data: profile } = useProfile()
  const { data: earned } = useUserAchievements()
  const activePlan = useActiveTrainingPlan()

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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: theme.text, fontSize: theme.fontSize.md, fontWeight: "600" }}>
            Today's Training
          </Text>
          <Text
            onPress={() => router.push("/plan")}
            style={{ color: theme.accent, fontWeight: "600" }}
          >
            {activePlan ? "View Plan" : "Choose a Plan"}
          </Text>
        </View>
        {activePlan ? (
          (() => {
            const template = activePlan.plan_json as unknown as PlanTemplate
            const daysSinceStart = Math.max(
              0,
              Math.floor(
                (Date.now() - new Date(activePlan.start_date).getTime()) / 86400000
              )
            )
            const dayIndex = daysSinceStart % template.sessionsPerWeek
            const today = template.days[dayIndex]
            return (
              <View style={{ marginTop: theme.spacing(1) }}>
                <Text style={{ color: theme.accent, fontWeight: "700" }}>{today.focus}</Text>
                {today.blocks.map((block, index) => (
                  <Text key={index} style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
                    {block.name} · {block.details}
                  </Text>
                ))}
              </View>
            )
          })()
        ) : (
          <View style={{ marginTop: theme.spacing(1) }}>
            <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
              Pick a research-based weekly plan to see what to train today.
            </Text>
            <Button title="Choose a Plan" variant="secondary" onPress={() => router.push("/plan")} />
          </View>
        )}
      </Card>
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
