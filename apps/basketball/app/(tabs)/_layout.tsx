import { Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useTheme } from "@athlete/ui"

const ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index: { active: "home", inactive: "home-outline" },
  history: { active: "stats-chart", inactive: "stats-chart-outline" },
  achievements: { active: "trophy", inactive: "trophy-outline" },
  profile: { active: "person", inactive: "person-outline" },
}

export default function TabsLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
          borderTopWidth: theme.borderWidth,
          height: 74,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarLabel: ({ color, children }) => (
          <Text
            numberOfLines={2}
            style={{
              color,
              fontFamily: theme.fontFamily.semibold,
              fontSize: 9.5,
              lineHeight: 11,
              textAlign: "center",
            }}
          >
            {children}
          </Text>
        ),
        tabBarIcon: ({ color, size, focused }) =>
          route.name === "log" ? null : (
            <Ionicons
              name={focused ? ICONS[route.name].active : ICONS[route.name].inactive}
              color={color}
              size={size}
            />
          ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="history" options={{ title: "History" }} />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                backgroundColor: theme.accent,
                borderWidth: theme.borderWidth,
                borderColor: theme.border,
                alignItems: "center",
                justifyContent: "center",
                marginTop: -28,
                ...theme.shadow,
              }}
            >
              <Ionicons name="add" color={theme.onAccent} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="achievements" options={{ title: "Achievements" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="reaction" options={{ href: null }} />
    </Tabs>
  )
}
