import { useState } from "react"
import { Text, View } from "react-native"
import { Link } from "expo-router"
import { useSupabase } from "@athlete/supabase-client"
import { Button, ScreenContainer, TextField, useTheme } from "@athlete/ui"

export default function SignIn() {
  const supabase = useSupabase()
  const theme = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignIn() {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <ScreenContainer scroll={false}>
      <View style={{ flex: 1, justifyContent: "center", gap: theme.spacing(2) }}>
        <Text style={{ color: theme.accent, fontSize: theme.fontSize.sm, fontWeight: "700" }}>
          IRONPATH
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.xxl, fontWeight: "700" }}>
          Welcome back
        </Text>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
        {error && <Text style={{ color: theme.danger }}>{error}</Text>}
        <Button title="Sign In" onPress={handleSignIn} loading={loading} />
        <Link href="/(auth)/sign-up" style={{ color: theme.textMuted, textAlign: "center" }}>
          Don't have an account? Sign up
        </Link>
      </View>
    </ScreenContainer>
  )
}
