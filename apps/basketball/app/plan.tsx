import { useMemo, useState } from "react"
import { Text, View } from "react-native"
import { router } from "expo-router"
import { Button, Card, Chip, ScreenContainer, useTheme } from "@athlete/ui"
import { getPlanTemplate, type PlanTemplate } from "@athlete/plan-templates"
import { useActivateTrainingPlan, useActiveTrainingPlan, useProfile } from "../lib/queries"

const FREQUENCIES = [2, 3, 4, 5, 6]

export default function Plan() {
  const theme = useTheme()
  const { data: profile } = useProfile()
  const activePlan = useActiveTrainingPlan()
  const activatePlan = useActivateTrainingPlan()
  const [error, setError] = useState<string | null>(null)
  const [choosing, setChoosing] = useState(!activePlan)

  const defaultFrequency = Math.min(6, Math.max(2, profile?.weekly_session_target ?? 3))
  const [frequency, setFrequency] = useState(
    activePlan ? activePlan.sessions_per_week : defaultFrequency
  )

  const previewTemplate = useMemo(() => getPlanTemplate("basketball", frequency), [frequency])
  const activeTemplate = activePlan ? (activePlan.plan_json as unknown as PlanTemplate) : null

  async function handleActivate() {
    setError(null)
    try {
      await activatePlan.mutateAsync({
        title: previewTemplate.title,
        sessions_per_week: previewTemplate.sessionsPerWeek,
        plan_json: previewTemplate as any,
        source: "template",
      })
      setChoosing(false)
    } catch (e: any) {
      setError(e.message ?? "Something went wrong")
    }
  }

  return (
    <ScreenContainer>
      <Text
        onPress={() => router.back()}
        style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}
      >
        ‹ Back
      </Text>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700", fontFamily: theme.fontFamily.extrabold }}>
        Training Plan
      </Text>

      {activePlan && !choosing && activeTemplate && (
        <>
          <Card>
            <Text style={{ color: theme.textMuted }}>Active Plan</Text>
            <Text style={{ color: theme.text, fontSize: theme.fontSize.lg, fontWeight: "700" }}>
              {activeTemplate.title}
            </Text>
            <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
              {activeTemplate.rationale}
            </Text>
          </Card>
          <PlanDays template={activeTemplate} />
          <Button title="Change Plan" variant="secondary" onPress={() => setChoosing(true)} />
        </>
      )}

      {choosing && (
        <>
          <Card>
            <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
              Sessions per week
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
              {FREQUENCIES.map((f) => (
                <Chip
                  key={f}
                  label={String(f)}
                  selected={frequency === f}
                  onPress={() => setFrequency(f)}
                />
              ))}
            </View>
          </Card>
          <Card>
            <Text style={{ color: theme.text, fontSize: theme.fontSize.lg, fontWeight: "700" }}>
              {previewTemplate.title}
            </Text>
            <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
              {previewTemplate.rationale}
            </Text>
          </Card>
          <PlanDays template={previewTemplate} />
          {error && <Text style={{ color: theme.danger }}>{error}</Text>}
          <Button
            title={activePlan ? "Switch to This Plan" : "Activate This Plan"}
            onPress={handleActivate}
            loading={activatePlan.isPending}
          />
          {activePlan && (
            <Button title="Cancel" variant="ghost" onPress={() => setChoosing(false)} />
          )}
        </>
      )}
    </ScreenContainer>
  )
}

function PlanDays({ template }: { template: PlanTemplate }) {
  const theme = useTheme()
  return (
    <View style={{ gap: theme.spacing(1.5) }}>
      {template.days.map((day) => (
        <Card key={day.day}>
          <Text style={{ color: theme.accent, fontWeight: "700" }}>
            Day {day.day} · {day.focus}
          </Text>
          <View style={{ gap: theme.spacing(0.5), marginTop: theme.spacing(1) }}>
            {day.blocks.map((block, index) => (
              <View key={index}>
                <Text style={{ color: theme.text, fontWeight: "600" }}>{block.name}</Text>
                <Text style={{ color: theme.textMuted }}>{block.details}</Text>
              </View>
            ))}
          </View>
        </Card>
      ))}
    </View>
  )
}
