import { ActivityIndicator } from "react-native"
import { ScreenContainer, useTheme } from "@athlete/ui"

export default function Index() {
  const theme = useTheme()
  return (
    <ScreenContainer scroll={false} style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color={theme.accent} />
    </ScreenContainer>
  )
}
