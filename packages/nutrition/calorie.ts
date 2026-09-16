export type Sex = "male" | "female" | "unspecified"
export type Goal = "lose_weight" | "maintain" | "gain_muscle" | "improve_performance"
export type ActivityLevel = "sedentary" | "light" | "moderate" | "very_active" | "extra_active"

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
}

/** Mifflin-St Jeor equation. */
export function calculateBMR(params: {
  sex: Sex
  weightKg: number
  heightCm: number
  ageYears: number
}): number {
  const { sex, weightKg, heightCm, ageYears } = params
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears
  if (sex === "male") return base + 5
  if (sex === "female") return base - 161
  return base - 78 // midpoint offset when sex is unspecified
}

/** Maps weekly training sessions to a standard activity multiplier tier. */
export function activityLevelFromSessionsPerWeek(sessionsPerWeek: number): ActivityLevel {
  if (sessionsPerWeek <= 1) return "sedentary"
  if (sessionsPerWeek <= 3) return "light"
  if (sessionsPerWeek <= 5) return "moderate"
  if (sessionsPerWeek <= 6) return "very_active"
  return "extra_active"
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel]
}

const MIN_SAFE_CALORIES = 1200

export function calorieTargetForGoal(tdee: number, goal: Goal): number {
  switch (goal) {
    case "lose_weight":
      return Math.max(MIN_SAFE_CALORIES, Math.round(tdee - 500))
    case "gain_muscle":
      return Math.round(tdee + 300)
    case "improve_performance":
      return Math.round(tdee + 100)
    case "maintain":
    default:
      return Math.round(tdee)
  }
}

export type MacroTargets = { proteinG: number; carbG: number; fatG: number }

const PROTEIN_G_PER_KG: Record<Goal, number> = {
  lose_weight: 2.2, // higher protein preserves lean mass in a deficit
  maintain: 1.8,
  gain_muscle: 2.0,
  improve_performance: 2.0,
}

/** Splits a calorie target into protein/fat/carb grams, protein anchored to bodyweight. */
export function calculateMacros(params: {
  calorieTarget: number
  weightKg: number
  goal: Goal
}): MacroTargets {
  const { calorieTarget, weightKg, goal } = params
  const proteinG = Math.round(PROTEIN_G_PER_KG[goal] * weightKg)
  const proteinCalories = proteinG * 4

  const fatCalories = calorieTarget * 0.25
  const fatG = Math.round(fatCalories / 9)

  const carbCalories = Math.max(0, calorieTarget - proteinCalories - fatCalories)
  const carbG = Math.round(carbCalories / 4)

  return { proteinG, carbG, fatG }
}

export function calculateDailyTargets(params: {
  sex: Sex
  weightKg: number
  heightCm: number
  ageYears: number
  sessionsPerWeek: number
  goal: Goal
}): { bmr: number; tdee: number; calorieTarget: number; macros: MacroTargets } {
  const bmr = calculateBMR(params)
  const activityLevel = activityLevelFromSessionsPerWeek(params.sessionsPerWeek)
  const tdee = calculateTDEE(bmr, activityLevel)
  const calorieTarget = calorieTargetForGoal(tdee, params.goal)
  const macros = calculateMacros({ calorieTarget, weightKg: params.weightKg, goal: params.goal })
  return { bmr, tdee, calorieTarget, macros }
}
