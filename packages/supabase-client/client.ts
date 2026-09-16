import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"
import type { Database } from "@athlete/types"

export function createSupabaseClient(
  url: string | undefined,
  anonKey: string | undefined
): SupabaseClient<Database> {
  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase config: set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your app's .env"
    )
  }

  return createClient<Database>(url, anonKey, {
    auth: {
      storage: Platform.OS === "web" ? undefined : AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web",
    },
  })
}
