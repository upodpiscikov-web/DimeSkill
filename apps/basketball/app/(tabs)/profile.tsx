import { Text } from "react-native"
import { ScreenContainer, Card, Button, useTheme } from "@athlete/ui"
import { useSupabase, useSession } from "@athlete/supabase-client"
import { useProfile } from "../../lib/queries"

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
      <Button title="Sign Out" variant="secondary" onPress={() => supabase.auth.signOut()} />
    </ScreenContainer>
  )
}
