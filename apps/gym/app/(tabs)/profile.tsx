import { Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { ScreenContainer, Card, Button, useTheme } from "@athlete/ui"
import { useSupabase, useSession } from "@athlete/supabase-client"
import { useProfile } from "../../lib/queries"
import { openLegalPage, type LegalPage } from "../../lib/legal"

const LEGAL_LINKS: { page: LegalPage; label: string }[] = [
  { page: "privacy", label: "Privacy Policy" },
  { page: "terms", label: "Terms & Conditions" },
  { page: "cookies", label: "Cookies & Local Storage Policy" },
  { page: "refund", label: "Refund Policy" },
]

export default function Profile() {
  const theme = useTheme()
  const supabase = useSupabase()
  const { session } = useSession()
  const { data: profile } = useProfile()

  return (
    <ScreenContainer>
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700" }}>
        Profile
      </Text>
      <Card>
        <Text style={{ color: theme.textMuted }}>Signed in as</Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>{session?.user.email}</Text>
      </Card>
      <Card>
        <Text style={{ color: theme.textMuted }}>Display name</Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
          {profile?.display_name ?? "-"}
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
          Weekly session target
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
          {profile?.weekly_session_target ?? "-"}
        </Text>
      </Card>

      <Card>
        <Text style={{ color: theme.text, fontWeight: "600", marginBottom: theme.spacing(1) }}>
          Legal
        </Text>
        <View style={{ gap: theme.spacing(0.5) }}>
          {LEGAL_LINKS.map(({ page, label }) => (
            <Pressable
              key={page}
              onPress={() => openLegalPage(page)}
              accessibilityRole="link"
              accessibilityLabel={label}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: theme.spacing(1),
              }}
            >
              <Text style={{ color: theme.text }}>{label}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Pressable>
          ))}
        </View>
      </Card>

      <Button title="Sign Out" variant="secondary" onPress={() => supabase.auth.signOut()} />
    </ScreenContainer>
  )
}
