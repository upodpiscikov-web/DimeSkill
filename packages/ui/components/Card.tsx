import React from "react"
import { View, type ViewStyle } from "react-native"
import { useTheme } from "../ThemeProvider"

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const theme = useTheme()
  return (
    <View
      style={{
        backgroundColor: theme.surface,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.border,
        padding: theme.spacing(2),
        ...style,
      }}
    >
      {children}
    </View>
  )
}
