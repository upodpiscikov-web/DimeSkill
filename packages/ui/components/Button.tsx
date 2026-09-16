import React from "react"
import { ActivityIndicator, Pressable, Text } from "react-native"
import { useTheme } from "../ThemeProvider"

type ButtonVariant = "primary" | "secondary" | "ghost"

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
}) {
  const theme = useTheme()
  const isDisabled = disabled || loading

  const backgroundColor =
    variant === "primary" ? theme.accent : variant === "secondary" ? theme.surfaceAlt : "transparent"
  const textColor = variant === "primary" ? "#111318" : theme.text

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => ({
        backgroundColor,
        opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        paddingVertical: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(2.5),
        borderRadius: theme.radius.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "ghost" ? 1 : 0,
        borderColor: theme.border,
      })}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={{ color: textColor, fontSize: theme.fontSize.md, fontWeight: "600" }}>
          {title}
        </Text>
      )}
    </Pressable>
  )
}
