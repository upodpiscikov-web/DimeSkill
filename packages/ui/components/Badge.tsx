import React from "react"
import { Text, View } from "react-native"
import { useTheme } from "../ThemeProvider"

type BadgeTone = "accent" | "success" | "danger" | "neutral"

export function Badge({ label, tone = "neutral" }: { label: string; tone?: BadgeTone }) {
  const theme = useTheme()
  const color =
    tone === "accent" ? theme.accent : tone === "success" ? theme.success : tone === "danger" ? theme.danger : theme.textMuted

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: theme.surfaceAlt,
        borderRadius: theme.radius.pill,
        paddingVertical: theme.spacing(0.5),
        paddingHorizontal: theme.spacing(1.25),
        borderWidth: 1,
        borderColor: color,
      }}
    >
      <Text style={{ color, fontSize: theme.fontSize.xs, fontWeight: "600" }}>{label}</Text>
    </View>
  )
}
