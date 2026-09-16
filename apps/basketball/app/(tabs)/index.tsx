import { Image, Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { ScreenContainer, Card, StatRow, StatTile, Badge, Button, useTheme } from "@athlete/ui"
import type { PlanTemplate } from "@athlete/plan-templates"
import {
  useActiveTrainingPlan,
  useBasketballSessions,
  useFoodLogEntries,
  useProfile,
  useUserAchievements,
} from "../../lib/queries"

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

export default function Home() {
  const theme = useTheme()
  const { data: sessions } = useBasketballSessions()
  const { data: profile } = useProfile()
  const { data: earned } = useUserAchievements()
  const activePlan = useActiveTrainingPlan()
  const { data: foodEntries } = useFoodLogEntries(todayIso())
  const caloriesToday = (foodEntries ?? []).reduce((sum, e) => sum + e.calories, 0)

  const sessionCount = sessions?.length ?? 0
  const thisWeekCount =
    sessions?.filter((s) => {
      const diffDays = (Date.now() - new Date(s.session_date).getTime()) / 86400000
      return diffDays <= 7
    }).length ?? 0
  const target = profile?.weekly_session_target ?? 3

  return (
    <ScreenContainer>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Image
          source={require("../../assets/logo-wide.png")}
          style={{ width: 240, height: 51 }}
          resizeMode="contain"
          accessibilityLabel="DimeSkill"
        />
      </View>

      <View style={{ alignItems: "center", marginVertical: theme.spacing(1) }}>
        <Pressable
          onPress={() => router.push("/workout")}
          accessibilityRole="button"
          accessibilityLabel="Start a workout"
          style={({ pressed }) => ({
            width: 168,
            height: 168,
            borderRadius: 999,
            backgroundColor: theme.primarySurface,
            borderWidth: 5,
            borderColor: theme.accent,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.9 : 1,
            ...theme.shadow,
          })}
        >
          <Ionicons name="play" color={theme.onPrimarySurface} size={44} />
          <Text
            style={{
              color: theme.onPrimarySurface,
              fontFamily: theme.fontFamily.extrabold,
              fontWeight: "800",
              fontSize: theme.fontSize.md,
              marginTop: theme.spacing(0.5),
              textTransform: "lowercase",
            }}
          >
            workout
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", gap: theme.spacing(1.5) }}>
        <Pressable style={{ flex: 1 }} onPress={() => router.push("/(tabs)/history")}>
          <Card style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 92 }}>
            <Text
              style={{
                color: theme.text,
                fontFamily: theme.fontFamily.extrabold,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Drills
            </Text>
          </Card>
        </Pressable>
        <Pressable style={{ flex: 1 }} onPress={() => router.push("/(tabs)/achievements")}>
          <Card style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 92 }}>
            <Text
              style={{
                color: theme.text,
                fontFamily: theme.fontFamily.extrabold,
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Achievements
            </Text>
          </Card>
        </Pressable>
      </View>

      <StatRow>
        <StatTile label="This Week" value={`${thisWeekCount}/${target}`} accent />
        <StatTile label="Total Sessions" value={String(sessionCount)} />
      </StatRow>

      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text
            style={{
              color: theme.text,
              fontSize: theme.fontSize.md,
              fontFamily: theme.fontFamily.bold,
              fontWeight: "700",
            }}
          >
            Today's Training
          </Text>
          <Text
            onPress={() => router.push("/plan")}
            style={{ color: theme.accentText, fontFamily: theme.fontFamily.bold, fontWeight: "700" }}
          >
            {activePlan ? "View Plan" : "Choose a Plan"}
          </Text>
        </View>
        {activePlan ? (
          (() => {
            const template = activePlan.plan_json as unknown as PlanTemplate
            const daysSinceStart = Math.max(
              0,
              Math.floor((Date.now() - new Date(activePlan.start_date).getTime()) / 86400000)
            )
            const dayIndex = daysSinceStart % template.sessionsPerWeek
            const today = template.days[dayIndex]
            return (
              <View style={{ marginTop: theme.spacing(1) }}>
                <Text
                  style={{
                    color: theme.accentText,
                    fontFamily: theme.fontFamily.bold,
                    fontWeight: "700",
                  }}
                >
                  {today.focus}
                </Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text
            style={{
              color: theme.text,
              fontSize: theme.fontSize.md,
              fontFamily: theme.fontFamily.bold,
              fontWeight: "700",
            }}
          >
            Nutrition Today
          </Text>
          <Text
            onPress={() => router.push("/nutrition")}
            style={{ color: theme.accentText, fontFamily: theme.fontFamily.bold, fontWeight: "700" }}
          >
            Log Food
          </Text>
        </View>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
          {caloriesToday} kcal logged today
        </Text>
      </Card>

      <Card>
        <Text
          style={{
            color: theme.text,
            fontSize: theme.fontSize.md,
            fontFamily: theme.fontFamily.bold,
            fontWeight: "700",
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
