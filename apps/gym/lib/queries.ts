import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSupabase, useSession } from "@athlete/supabase-client"
import type { TablesInsert, TablesUpdate } from "@athlete/types"

export function useGymSessions() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["gym_sessions", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gym_sessions")
        .select("*, gym_exercise_sets(*)")
        .order("session_date", { ascending: false })
      if (error) throw error
      return data
    },
  })
}

type NewGymSession = Omit<TablesInsert<"gym_sessions">, "user_id">
type NewExerciseSet = Omit<TablesInsert<"gym_exercise_sets">, "session_id">

export function useCreateGymSession() {
  const supabase = useSupabase()
  const { session } = useSession()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ session: input, sets }: { session: NewGymSession; sets: NewExerciseSet[] }) => {
      if (!session) throw new Error("Not signed in")
      const { data: created, error } = await supabase
        .from("gym_sessions")
        .insert({ ...input, user_id: session.user.id })
        .select()
        .single()
      if (error) throw error

      if (sets.length > 0) {
        const { error: setsError } = await supabase
          .from("gym_exercise_sets")
          .insert(sets.map((set) => ({ ...set, session_id: created.id })))
        if (setsError) throw setsError
      }

      return created
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gym_sessions"] })
      queryClient.invalidateQueries({ queryKey: ["user_achievements"] })
      queryClient.invalidateQueries({ queryKey: ["milestones"] })
    },
  })
}

export function useMilestones() {
  const supabase = useSupabase()
  const { session } = useSession()
  return useQuery({
    queryKey: ["milestones", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("milestones")
        .select("*")
        .order("achieved_at", { ascending: false })
        .limit(20)
      if (error) throw error
      return data
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
        .select("*, achievement:achievements!inner(*)")
        .in("achievement.sport", ["gym", "both"])
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
        .in("sport", ["gym", "both"])
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
