import React from "react"
import { Text, View } from "react-native"
import { useTheme } from "../ThemeProvider"
import { Card } from "./Card"

export function StatTile({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  const theme = useTheme()
  return (
    <Card style={{ flex: 1, alignItems: "flex-start", gap: theme.spacing(0.5) }}>
      <Text
        style={{
          color: theme.textMuted,
          fontSize: theme.fontSize.xs,
          fontFamily: theme.fontFamily.medium,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: accent ? theme.accentText : theme.text,
          fontSize: theme.fontSize.xl,
          fontWeight: "800",
          fontFamily: theme.fontFamily.extrabold,
        }}
      >
        {value}
      </Text>
    </Card>
  )
}

export function StatRow({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return <View style={{ flexDirection: "row", gap: theme.spacing(1.5) }}>{children}</View>
}
