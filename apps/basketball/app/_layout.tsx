import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ActivityIndicator } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans"
import { SupabaseProvider, useSession } from "@athlete/supabase-client"
import { ThemeProvider, basketballTheme, useTheme } from "@athlete/ui"

const queryClient = new QueryClient()

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    const inAuthGroup = segments[0] === "(auth)"
    const inTabsGroup = segments[0] === "(tabs)"
    const inLegalGroup = segments[0] === "legal"
    const isStandaloneAuthedRoute =
      segments[0] === "edit-profile" ||
      segments[0] === "session" ||
      segments[0] === "plan" ||
      segments[0] === "nutrition" ||
      segments[0] === "workout"

    if (inLegalGroup) return

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/sign-in")
    } else if (session && !inTabsGroup && !isStandaloneAuthedRoute) {
      router.replace("/(tabs)")
    }
  }, [session, isLoading, segments])

  if (isLoading) return null
  return <>{children}</>
}

function LoadingScreen() {
  const theme = useTheme()
  return <ActivityIndicator color={theme.accent} style={{ flex: 1 }} />
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  })

  return (
    <SafeAreaProvider>
      <SupabaseProvider url={SUPABASE_URL} anonKey={SUPABASE_ANON_KEY}>
        <ThemeProvider theme={basketballTheme}>
          {!fontsLoaded ? (
            <LoadingScreen />
          ) : (
            <QueryClientProvider client={queryClient}>
              <AuthGate>
                <Stack screenOptions={{ headerShown: false }} />
              </AuthGate>
            </QueryClientProvider>
          )}
        </ThemeProvider>
      </SupabaseProvider>
    </SafeAreaProvider>
  )
}
