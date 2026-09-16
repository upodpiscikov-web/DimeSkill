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
    variant === "primary"
      ? theme.primarySurface
      : variant === "secondary"
        ? theme.surfaceAlt
        : "transparent"
  const textColor = variant === "primary" ? theme.onPrimarySurface : theme.text

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => ({
        backgroundColor,
        opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        paddingVertical: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(2.5),
        borderRadius: theme.radius.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "primary" ? 0 : theme.borderWidth,
        borderColor: theme.border,
        ...(variant === "primary" ? theme.shadow : null),
      })}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={{
            color: textColor,
            fontSize: theme.fontSize.md,
            fontWeight: "700",
            fontFamily: theme.fontFamily.bold,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  )
}
