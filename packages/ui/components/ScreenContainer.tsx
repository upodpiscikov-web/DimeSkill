import React from "react"
import { SafeAreaView, ScrollView, View, type ViewStyle } from "react-native"
import { useTheme } from "../ThemeProvider"

export function ScreenContainer({
  children,
  scroll = true,
  style,
}: {
  children: React.ReactNode
  scroll?: boolean
  style?: ViewStyle
}) {
  const theme = useTheme()
  const contentStyle: ViewStyle = { padding: theme.spacing(2), gap: theme.spacing(2), ...style }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {scroll ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, ...contentStyle }}>
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, ...contentStyle }}>{children}</View>
      )}
    </SafeAreaView>
  )
}
