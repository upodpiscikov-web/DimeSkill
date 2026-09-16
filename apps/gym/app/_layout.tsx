import { useEffect } from "react"
import { Stack, useRouter, useSegments } from "expo-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SupabaseProvider, useSession } from "@athlete/supabase-client"
import { ThemeProvider, gymTheme } from "@athlete/ui"

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

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/sign-in")
    } else if (session && !inTabsGroup) {
      router.replace("/(tabs)")
    }
  }, [session, isLoading, segments])

  if (isLoading) return null
  return <>{children}</>
}

export default function RootLayout() {
  return (
    <SupabaseProvider url={SUPABASE_URL} anonKey={SUPABASE_ANON_KEY}>
      <ThemeProvider theme={gymTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }} />
          </AuthGate>
        </QueryClientProvider>
      </ThemeProvider>
    </SupabaseProvider>
  )
}
