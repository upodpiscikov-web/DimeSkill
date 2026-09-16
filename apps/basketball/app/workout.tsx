import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Badge, Card, ScreenContainer, useTheme } from "@athlete/ui"

const SKILL_OPTIONS = [
  { label: "Dribbling", drill: "Dribbling" },
  { label: "Catch & Shoot", drill: "Catch & Shoot" },
  { label: "Off-the-Dribble Shots", drill: "Off-the-Dribble Shots" },
]

export default function ChooseWorkout() {
  const theme = useTheme()
  const [skillExpanded, setSkillExpanded] = useState(false)

  return (
    <ScreenContainer>
      <Text
        onPress={() => router.back()}
        style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}
      >
        ‹ Back
      </Text>
      <Text
        style={{
          color: theme.text,
          fontSize: theme.fontSize.xl,
          fontFamily: theme.fontFamily.extrabold,
          fontWeight: "800",
        }}
      >
        Choose Your Workout
      </Text>

      <WorkoutOption
        icon="basketball"
        title="Full Workout"
        subtitle="Log a complete training session"
        onPress={() => router.push("/(tabs)/log")}
      />

      <WorkoutOption
        icon="body"
        title="Skill-Based Workout"
        subtitle="Focus on one skill: dribbling, shooting, or finishing"
        onPress={() => setSkillExpanded((prev) => !prev)}
        expanded={skillExpanded}
      />
      {skillExpanded && (
        <View style={{ gap: theme.spacing(1), paddingLeft: theme.spacing(2) }}>
          {SKILL_OPTIONS.map((option) => (
            <Pressable
              key={option.drill}
              onPress={() =>
                router.push({ pathname: "/(tabs)/log", params: { focusDrill: option.drill } })
              }
              accessibilityRole="button"
              accessibilityLabel={option.label}
            >
              <Card
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing(1.5),
                }}
              >
                <Text style={{ color: theme.text, fontFamily: theme.fontFamily.semibold, fontWeight: "600" }}>
                  {option.label}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
              </Card>
            </Pressable>
          ))}
        </View>
      )}

      <WorkoutOption
        icon="flash"
        title="Reaction Trainer"
        subtitle="Random-color reaction speed drill"
        onPress={() => router.push("/reaction")}
      />

      <WorkoutOption
        icon="git-branch"
        title="Decision Trainer"
        subtitle="Read-and-react scenario training"
        disabled
      />
    </ScreenContainer>
  )
}

function WorkoutOption({
  icon,
  title,
  subtitle,
  onPress,
  disabled = false,
  expanded = false,
}: {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  subtitle: string
  onPress?: () => void
  disabled?: boolean
  expanded?: boolean
}) {
  const theme = useTheme()
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      <Card style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing(1.5) }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: theme.radius.md,
            backgroundColor: theme.surfaceAlt,
            borderWidth: theme.borderWidth,
            borderColor: theme.border,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={icon} size={22} color={theme.text} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing(1) }}>
            <Text
              style={{
                color: theme.text,
                fontFamily: theme.fontFamily.bold,
                fontWeight: "700",
                fontSize: theme.fontSize.md,
              }}
            >
              {title}
            </Text>
            {disabled && <Badge label="Coming Soon" tone="neutral" />}
          </View>
          <Text style={{ color: theme.textMuted, marginTop: theme.spacing(0.25) }}>{subtitle}</Text>
        </View>
        {!disabled && (
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-forward"}
            size={20}
            color={theme.textMuted}
          />
        )}
      </Card>
    </Pressable>
  )
}
