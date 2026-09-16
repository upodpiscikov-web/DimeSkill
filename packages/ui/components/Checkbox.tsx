import React from "react"
import { Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../ThemeProvider"

export function Checkbox({
  checked,
  onToggle,
  label,
  accessibilityLabel,
}: {
  checked: boolean
  onToggle: () => void
  label: React.ReactNode
  accessibilityLabel: string
}) {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      style={{ flexDirection: "row", alignItems: "flex-start", gap: theme.spacing(1.25) }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: theme.radius.sm,
          borderWidth: 2,
          borderColor: checked ? theme.accent : theme.border,
          backgroundColor: checked ? theme.accent : "transparent",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {checked && <Ionicons name="checkmark" size={16} color="#111318" />}
      </View>
      <View style={{ flex: 1 }}>
        {typeof label === "string" ? (
          <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
            {label}
          </Text>
        ) : (
          label
        )}
      </View>
    </Pressable>
  )
}
