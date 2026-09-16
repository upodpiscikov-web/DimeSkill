import { useMemo, useState } from "react"
import { Pressable, Text, View } from "react-native"
import { router } from "expo-router"
import { Button, Card, ScreenContainer, TextField, useTheme } from "@athlete/ui"
import { calculateDailyTargets } from "@athlete/nutrition"
import {
  useCreateFoodLogEntry,
  useDeleteFoodLogEntry,
  useFoodLogEntries,
  useProfile,
} from "../lib/queries"

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function ageFromBirthDate(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age -= 1
  return age
}

export default function Nutrition() {
  const theme = useTheme()
  const { data: profile } = useProfile()
  const date = useMemo(() => todayIso(), [])
  const { data: entries } = useFoodLogEntries(date)
  const createEntry = useCreateFoodLogEntry()
  const deleteEntry = useDeleteFoodLogEntry()

  const [foodName, setFoodName] = useState("")
  const [calories, setCalories] = useState("")
  const [proteinG, setProteinG] = useState("")
  const [carbG, setCarbG] = useState("")
  const [fatG, setFatG] = useState("")
  const [error, setError] = useState<string | null>(null)

  const profileComplete =
    profile?.height_cm != null && profile?.weight_kg != null && profile?.birth_date != null

  const targets = useMemo(() => {
    if (!profileComplete || !profile) return null
    return calculateDailyTargets({
      sex: profile.sex,
      weightKg: profile.weight_kg!,
      heightCm: profile.height_cm!,
      ageYears: ageFromBirthDate(profile.birth_date!),
      sessionsPerWeek: profile.weekly_session_target,
      goal: profile.goal,
    })
  }, [profile, profileComplete])

  const totals = (entries ?? []).reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + (e.protein_g ?? 0),
      carb: acc.carb + (e.carb_g ?? 0),
      fat: acc.fat + (e.fat_g ?? 0),
    }),
    { calories: 0, protein: 0, carb: 0, fat: 0 }
  )

  async function handleAddFood() {
    setError(null)
    if (!foodName.trim()) {
      setError("Food name is required.")
      return
    }
    if (!calories || Number(calories) < 0) {
      setError("Enter a valid calorie amount.")
      return
    }
    try {
      await createEntry.mutateAsync({
        food_name: foodName.trim(),
        calories: Number(calories),
        protein_g: proteinG ? Number(proteinG) : null,
        carb_g: carbG ? Number(carbG) : null,
        fat_g: fatG ? Number(fatG) : null,
        logged_date: date,
      })
      setFoodName("")
      setCalories("")
      setProteinG("")
      setCarbG("")
      setFatG("")
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
        Nutrition
      </Text>

      {!profileComplete ? (
        <Card>
          <Text style={{ color: theme.text, marginBottom: theme.spacing(1) }}>
            Add your height, weight, and birth date to see personalized calorie and macro
            targets.
          </Text>
          <Button
            title="Complete Profile"
            variant="secondary"
            onPress={() => router.push("/edit-profile")}
          />
        </Card>
      ) : (
        targets && (
          <Card>
            <Text style={{ color: theme.textMuted }}>Daily Calorie Target</Text>
            <Text style={{ color: theme.text, fontSize: theme.fontSize.xxl, fontWeight: "700" }}>
              {targets.calorieTarget} kcal
            </Text>
            <View style={{ flexDirection: "row", gap: theme.spacing(2), marginTop: theme.spacing(1) }}>
              <MacroStat label="Protein" value={targets.macros.proteinG} theme={theme} />
              <MacroStat label="Carbs" value={targets.macros.carbG} theme={theme} />
              <MacroStat label="Fat" value={targets.macros.fatG} theme={theme} />
            </View>
          </Card>
        )
      )}

      <Card>
        <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
          Today's Log
        </Text>
        <Text style={{ color: theme.textMuted }}>
          {totals.calories} kcal logged
          {targets ? ` of ${targets.calorieTarget} (${Math.max(0, targets.calorieTarget - totals.calories)} remaining)` : ""}
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.5) }}>
          Protein {Math.round(totals.protein)}g · Carbs {Math.round(totals.carb)}g · Fat{" "}
          {Math.round(totals.fat)}g
        </Text>
        {entries && entries.length > 0 && (
          <View style={{ gap: theme.spacing(1), marginTop: theme.spacing(1.5) }}>
            {entries.map((entry) => (
              <View
                key={entry.id}
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
              >
                <View>
                  <Text style={{ color: theme.text }}>{entry.food_name}</Text>
                  <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}>
                    {entry.calories} kcal
                  </Text>
                </View>
                <Pressable
                  onPress={() => deleteEntry.mutate(entry.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${entry.food_name}`}
                >
                  <Text style={{ color: theme.danger }}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
          Add Food
        </Text>
        <TextField label="Food name" value={foodName} onChangeText={setFoodName} />
        <TextField
          label="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <View style={{ flexDirection: "row", gap: theme.spacing(1) }}>
          <View style={{ flex: 1 }}>
            <TextField
              label="Protein (g)"
              value={proteinG}
              onChangeText={setProteinG}
              keyboardType="numeric"
              placeholder="optional"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField
              label="Carbs (g)"
              value={carbG}
              onChangeText={setCarbG}
              keyboardType="numeric"
              placeholder="optional"
            />
          </View>
          <View style={{ flex: 1 }}>
            <TextField
              label="Fat (g)"
              value={fatG}
              onChangeText={setFatG}
              keyboardType="numeric"
              placeholder="optional"
            />
          </View>
        </View>
        {error && <Text style={{ color: theme.danger }}>{error}</Text>}
        <Button title="Add Food" onPress={handleAddFood} loading={createEntry.isPending} />
      </Card>
    </ScreenContainer>
  )
}

function MacroStat({ label, value, theme }: { label: string; value: number; theme: any }) {
  return (
    <View>
      <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}>{label}</Text>
      <Text style={{ color: theme.text, fontWeight: "600" }}>{value}g</Text>
    </View>
  )
}
