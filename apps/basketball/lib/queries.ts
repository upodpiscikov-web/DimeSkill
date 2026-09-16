import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSupabase, useSession } from "@athlete/supabase-client"
import type { TablesInsert, TablesUpdate } from "@athlete/types"

export function useBasketballSessions() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["basketball_sessions", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("basketball_sessions")
        .select("*")
        .order("session_date", { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useCreateBasketballSession() {
  const supabase = useSupabase()
  const { session } = useSession()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"basketball_sessions">, "user_id">) => {
      if (!session) throw new Error("Not signed in")
      const { data, error } = await supabase
        .from("basketball_sessions")
        .insert({ ...input, user_id: session.user.id })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basketball_sessions"] })
      queryClient.invalidateQueries({ queryKey: ["user_achievements"] })
    },
  })
}

export function useReactionDrillResults() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["reaction_drill_results", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reaction_drill_results")
        .select("*")
        .order("played_at", { ascending: false })
        .limit(20)
      if (error) throw error
      return data
    },
  })
}

export function useCreateReactionResult() {
  const supabase = useSupabase()
  const { session } = useSession()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"reaction_drill_results">, "user_id">) => {
      if (!session) throw new Error("Not signed in")
      const { data, error } = await supabase
        .from("reaction_drill_results")
        .insert({ ...input, user_id: session.user.id })
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reaction_drill_results"] })
      queryClient.invalidateQueries({ queryKey: ["user_achievements"] })
    },
  })
}

export function useUserAchievements() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["user_achievements", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_achievements")
        .select("*, achievement:achievements(*)")
        .order("earned_at", { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useAllAchievements() {
  const supabase = useSupabase()
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .in("sport", ["basketball", "both"])
        .order("created_at")
      if (error) throw error
      return data
    },
  })
}

export function useProfile() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["profile", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session!.user.id)
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useUpdateProfile() {
  const supabase = useSupabase()
  const { session } = useSession()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: TablesUpdate<"profiles">) => {
      if (!session) throw new Error("Not signed in")
      const { data, error } = await supabase
        .from("profiles")
        .update(input)
        .eq("id", session.user.id)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}
