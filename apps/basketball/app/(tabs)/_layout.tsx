import { Text } from "react-native"
import { Tabs } from "expo-router"
import { useTheme } from "@athlete/ui"

const ICONS: Record<string, string> = {
  index: "🏠",
  log: "➕",
  history: "📊",
  reaction: "⚡",
  achievements: "🏆",
  profile: "👤",
}

export default function TabsLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>{ICONS[route.name]}</Text>,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="log" options={{ title: "Log" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen name="reaction" options={{ title: "Reaction" }} />
      <Tabs.Screen name="achievements" options={{ title: "Achievements" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  )
}
