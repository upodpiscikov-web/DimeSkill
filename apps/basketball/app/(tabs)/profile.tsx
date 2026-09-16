import { Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { ScreenContainer, Card, Button, useTheme } from "@athlete/ui"
import { useSupabase, useSession } from "@athlete/supabase-client"
import { useProfile } from "../../lib/queries"
import { openLegalPage, type LegalPage } from "../../lib/legal"

function humanize(value: string) {
  return value.replace(/_/g, " ")
}

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
      <Text style={{ color: theme.text, fontSize: theme.fontSize.xl, fontWeight: "700", fontFamily: theme.fontFamily.extrabold }}>
        Profile
      </Text>
      <Card>
        <Text style={{ color: theme.textMuted }}>Signed in as</Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>{session?.user.email}</Text>
      </Card>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Text style={{ color: theme.text, fontWeight: "600" }}>Display name</Text>
          <Pressable onPress={() => router.push("/edit-profile")} accessibilityRole="button" accessibilityLabel="Edit Profile">
            <Text style={{ color: theme.accent, fontWeight: "600" }}>Edit</Text>
          </Pressable>
        </View>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
          {profile?.display_name ?? "-"}
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
          Weekly session target
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
          {profile?.weekly_session_target ?? "-"}
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>Height / Weight</Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md }}>
          {profile?.height_cm ?? "-"} cm / {profile?.weight_kg ?? "-"} kg
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
          Training objective
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md, textTransform: "capitalize" }}>
          {profile ? humanize(profile.goal) : "-"}
        </Text>
        <Text style={{ color: theme.textMuted, marginTop: theme.spacing(1) }}>
          Experience level
        </Text>
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md, textTransform: "capitalize" }}>
          {profile ? humanize(profile.experience_level) : "-"}
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
