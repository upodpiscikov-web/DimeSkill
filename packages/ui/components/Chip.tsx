import React from "react"
import { Pressable, Text } from "react-native"
import { useTheme } from "../ThemeProvider"

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string
  selected: boolean
  onPress: () => void
}) {
  const theme = useTheme()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      style={{
        paddingVertical: theme.spacing(0.75),
        paddingHorizontal: theme.spacing(1.5),
        borderRadius: theme.radius.pill,
        backgroundColor: selected ? theme.accent : theme.surfaceAlt,
        borderWidth: 1,
        borderColor: selected ? theme.accent : theme.border,
      }}
    >
      <Text style={{ color: selected ? "#111318" : theme.text, textTransform: "capitalize" }}>
        {label}
      </Text>
    </Pressable>
  )
}
