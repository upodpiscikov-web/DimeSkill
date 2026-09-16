import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { router } from "expo-router"
import { Button, Card, Chip, ScreenContainer, TextField, useTheme } from "@athlete/ui"
import type { Enums } from "@athlete/types"
import { useProfile, useUpdateProfile } from "../lib/queries"

const SEX_OPTIONS: Enums<"sex_type">[] = ["unspecified", "male", "female"]
const GOAL_OPTIONS: Enums<"training_goal">[] = [
  "lose_weight",
  "maintain",
  "gain_muscle",
  "improve_performance",
]
const EXPERIENCE_OPTIONS: Enums<"experience_level">[] = ["beginner", "intermediate", "advanced"]
const UNIT_OPTIONS: Enums<"unit_pref">[] = ["metric", "imperial"]

function humanize(value: string) {
  return value.replace(/_/g, " ")
}

export default function EditProfile() {
  const theme = useTheme()
  const { data: profile } = useProfile()
  const updateProfile = useUpdateProfile()

  const [displayName, setDisplayName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [sex, setSex] = useState<Enums<"sex_type">>("unspecified")
  const [heightCm, setHeightCm] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [goal, setGoal] = useState<Enums<"training_goal">>("maintain")
  const [experienceLevel, setExperienceLevel] = useState<Enums<"experience_level">>("beginner")
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [unitPref, setUnitPref] = useState<Enums<"unit_pref">>("metric")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) return
    setDisplayName(profile.display_name ?? "")
    setBirthDate(profile.birth_date ?? "")
    setSex(profile.sex)
    setHeightCm(profile.height_cm != null ? String(profile.height_cm) : "")
    setWeightKg(profile.weight_kg != null ? String(profile.weight_kg) : "")
    setGoal(profile.goal)
    setExperienceLevel(profile.experience_level)
    setWeeklyTarget(String(profile.weekly_session_target))
    setUnitPref(profile.unit_pref)
  }, [profile])

  async function handleSave() {
    setError(null)
    if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      setError("Birth date must be in YYYY-MM-DD format, or left blank.")
      return
    }
    try {
      await updateProfile.mutateAsync({
        display_name: displayName || null,
        birth_date: birthDate || null,
        sex,
        height_cm: heightCm ? Number(heightCm) : null,
        weight_kg: weightKg ? Number(weightKg) : null,
        goal,
        experience_level: experienceLevel,
        weekly_session_target: weeklyTarget ? Number(weeklyTarget) : 0,
        unit_pref: unitPref,
      })
      router.back()
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
        ‹ Back to Profile
      </Text>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700", fontFamily: theme.fontFamily.extrabold }}>
        Edit Profile
      </Text>

      <TextField label="Display name" value={displayName} onChangeText={setDisplayName} />
      <TextField
        label="Birth date"
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="YYYY-MM-DD (optional)"
      />

      <Card>
        <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>Sex</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
          {SEX_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={humanize(option)}
              selected={sex === option}
              onPress={() => setSex(option)}
            />
          ))}
        </View>
      </Card>

      <TextField
        label="Height (cm)"
        value={heightCm}
        onChangeText={setHeightCm}
        keyboardType="numeric"
        placeholder="optional"
      />
      <TextField
        label="Weight (kg)"
        value={weightKg}
        onChangeText={setWeightKg}
        keyboardType="numeric"
        placeholder="optional"
      />

      <Card>
        <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
          Training objective
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
          {GOAL_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={humanize(option)}
              selected={goal === option}
              onPress={() => setGoal(option)}
            />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
          Experience level
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
          {EXPERIENCE_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={humanize(option)}
              selected={experienceLevel === option}
              onPress={() => setExperienceLevel(option)}
            />
          ))}
        </View>
      </Card>

      <TextField
        label="Weekly session target"
        value={weeklyTarget}
        onChangeText={setWeeklyTarget}
        keyboardType="numeric"
      />

      <Card>
        <Text style={{ color: theme.textMuted, marginBottom: theme.spacing(1) }}>
          Unit preference
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing(1) }}>
          {UNIT_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={humanize(option)}
              selected={unitPref === option}
              onPress={() => setUnitPref(option)}
            />
          ))}
        </View>
      </Card>

      {error && <Text style={{ color: theme.danger }}>{error}</Text>}
      <Button title="Save Changes" onPress={handleSave} loading={updateProfile.isPending} />
    </ScreenContainer>
  )
}
