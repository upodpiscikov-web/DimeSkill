import React from "react"
import { Text, TextInput, View, type TextInputProps } from "react-native"
import { useTheme } from "../ThemeProvider"

export function TextField({
  label,
  ...inputProps
}: { label: string } & TextInputProps) {
  const theme = useTheme()
  return (
    <View style={{ gap: theme.spacing(0.5) }}>
      <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}>{label}</Text>
      <TextInput
        placeholderTextColor={theme.textMuted}
        accessibilityLabel={label}
        style={{
          backgroundColor: theme.surfaceAlt,
          color: theme.text,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.border,
          paddingVertical: theme.spacing(1.25),
          paddingHorizontal: theme.spacing(1.5),
          fontSize: theme.fontSize.md,
        }}
        {...inputProps}
      />
    </View>
  )
}
