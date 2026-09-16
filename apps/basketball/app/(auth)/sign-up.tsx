import { useState } from "react"
import { Text, View } from "react-native"
import { Link } from "expo-router"
import { useSupabase } from "@athlete/supabase-client"
import { Button, Checkbox, ScreenContainer, TextField, useTheme } from "@athlete/ui"
import { LEGAL_DOCUMENT_VERSION } from "@athlete/legal"
import { openLegalPage } from "../../lib/legal"

export default function SignUp() {
  const supabase = useSupabase()
  const theme = useTheme()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    setError(null)
    if (!agreedToTerms) {
      setError("Please agree to the Terms & Conditions and Privacy Policy to continue.")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          terms_accepted_at: new Date().toISOString(),
          terms_version: LEGAL_DOCUMENT_VERSION,
        },
      },
    })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <ScreenContainer scroll={false}>
      <View style={{ flex: 1, justifyContent: "center", gap: theme.spacing(2) }}>
        <Text style={{ color: theme.accent, fontSize: theme.fontSize.sm, fontWeight: "700" }}>
          DIMESKILL
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.xxl, fontWeight: "700" }}>
          Create your account
        </Text>
        <TextField label="Display name" value={displayName} onChangeText={setDisplayName} />
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />

        <Checkbox
          checked={agreedToTerms}
          onToggle={() => setAgreedToTerms((prev) => !prev)}
          accessibilityLabel="I agree to the Terms & Conditions and Privacy Policy"
          label={
            <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
              I agree to the{" "}
              <Text
                onPress={() => openLegalPage("terms")}
                style={{ color: theme.accent, fontWeight: "600" }}
              >
                Terms & Conditions
              </Text>{" "}
              and{" "}
              <Text
                onPress={() => openLegalPage("privacy")}
                style={{ color: theme.accent, fontWeight: "600" }}
              >
                Privacy Policy
              </Text>
            </Text>
          }
        />

        {error && <Text style={{ color: theme.danger }}>{error}</Text>}
        <Button title="Sign Up" onPress={handleSignUp} loading={loading} />
        <Link href="/(auth)/sign-in" style={{ color: theme.textMuted, textAlign: "center" }}>
          Already have an account? Sign in
        </Link>
      </View>
    </ScreenContainer>
  )
}
