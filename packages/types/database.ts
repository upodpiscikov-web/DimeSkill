export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          code: string
          created_at: string
          criteria: Json
          description: string
          icon: string
          id: string
          sport: Database["public"]["Enums"]["achievement_sport"]
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          criteria: Json
          description: string
          icon?: string
          id?: string
          sport: Database["public"]["Enums"]["achievement_sport"]
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          criteria?: Json
          description?: string
          icon?: string
          id?: string
          sport?: Database["public"]["Enums"]["achievement_sport"]
          title?: string
        }
        Relationships: []
      }
      ai_coach_conversations: {
        Row: {
          created_at: string
          id: string
          sport: Database["public"]["Enums"]["plan_sport"]
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          sport: Database["public"]["Enums"]["plan_sport"]
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          sport?: Database["public"]["Enums"]["plan_sport"]
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_coach_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["message_role"]
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["message_role"]
        }
        Relationships: [
          {
            foreignKeyName: "ai_coach_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_coach_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      basketball_drills: {
        Row: {
          drill_name: string
          duration_sec: number | null
          id: string
          makes: number | null
          notes: string | null
          reps: number | null
          session_id: string
        }
        Insert: {
          drill_name: string
          duration_sec?: number | null
          id?: string
          makes?: number | null
          notes?: string | null
          reps?: number | null
          session_id: string
        }
        Update: {
          drill_name?: string
          duration_sec?: number | null
          id?: string
          makes?: number | null
          notes?: string | null
          reps?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "basketball_drills_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "basketball_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      basketball_sessions: {
        Row: {
          created_at: string
          duration_min: number
          id: string
          notes: string | null
          points_scored: number | null
          rpe: number | null
          session_date: string
          session_type: Database["public"]["Enums"]["basketball_session_type"]
          shots_attempted: number | null
          shots_made: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_min: number
          id?: string
          notes?: string | null
          points_scored?: number | null
          rpe?: number | null
          session_date?: string
          session_type: Database["public"]["Enums"]["basketball_session_type"]
          shots_attempted?: number | null
          shots_made?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          duration_min?: number
          id?: string
          notes?: string | null
          points_scored?: number | null
          rpe?: number | null
          session_date?: string
          session_type?: Database["public"]["Enums"]["basketball_session_type"]
          shots_attempted?: number | null
          shots_made?: number | null
          user_id?: string
        }
        Relationships: []
      }
      food_log_entries: {
        Row: {
          calories: number
          carb_g: number | null
          created_at: string
          fat_g: number | null
          food_name: string
          id: string
          logged_date: string
          protein_g: number | null
          source: string
          user_id: string
        }
        Insert: {
          calories: number
          carb_g?: number | null
          created_at?: string
          fat_g?: number | null
          food_name: string
          id?: string
          logged_date?: string
          protein_g?: number | null
          source?: string
          user_id: string
        }
        Update: {
          calories?: number
          carb_g?: number | null
          created_at?: string
          fat_g?: number | null
          food_name?: string
          id?: string
          logged_date?: string
          protein_g?: number | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      gym_exercise_sets: {
        Row: {
          created_at: string
          exercise_name: string
          id: string
          reps: number | null
          rpe: number | null
          session_id: string
          set_number: number
          weight_kg: number | null
        }
        Insert: {
          created_at?: string
          exercise_name: string
          id?: string
          reps?: number | null
          rpe?: number | null
          session_id: string
          set_number: number
          weight_kg?: number | null
        }
        Update: {
          created_at?: string
          exercise_name?: string
          id?: string
          reps?: number | null
          rpe?: number | null
          session_id?: string
          set_number?: number
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gym_exercise_sets_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "gym_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_sessions: {
        Row: {
          created_at: string
          duration_min: number | null
          id: string
          notes: string | null
          rpe: number | null
          session_date: string
          session_type: Database["public"]["Enums"]["gym_session_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          rpe?: number | null
          session_date?: string
          session_type: Database["public"]["Enums"]["gym_session_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          rpe?: number | null
          session_date?: string
          session_type?: Database["public"]["Enums"]["gym_session_type"]
          user_id?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          carb_g: number | null
          created_at: string
          daily_calorie_target: number
          fat_g: number | null
          id: string
          is_active: boolean
          plan_json: Json
          protein_g: number | null
          title: string
          user_id: string
        }
        Insert: {
          carb_g?: number | null
          created_at?: string
          daily_calorie_target: number
          fat_g?: number | null
          id?: string
          is_active?: boolean
          plan_json: Json
          protein_g?: number | null
          title: string
          user_id: string
        }
        Update: {
          carb_g?: number | null
          created_at?: string
          daily_calorie_target?: number
          fat_g?: number | null
          id?: string
          is_active?: boolean
          plan_json?: Json
          protein_g?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          achieved_at: string | null
          created_at: string
          current_value: number
          id: string
          label: string
          sport: Database["public"]["Enums"]["achievement_sport"]
          target_value: number
          type: Database["public"]["Enums"]["milestone_type"]
          user_id: string
        }
        Insert: {
          achieved_at?: string | null
          created_at?: string
          current_value?: number
          id?: string
          label: string
          sport: Database["public"]["Enums"]["achievement_sport"]
          target_value: number
          type: Database["public"]["Enums"]["milestone_type"]
          user_id: string
        }
        Update: {
          achieved_at?: string | null
          created_at?: string
          current_value?: number
          id?: string
          label?: string
          sport?: Database["public"]["Enums"]["achievement_sport"]
          target_value?: number
          type?: Database["public"]["Enums"]["milestone_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          birth_date: string | null
          created_at: string
          display_name: string | null
          goal: Database["public"]["Enums"]["training_goal"]
          height_cm: number | null
          id: string
          sex: Database["public"]["Enums"]["sex_type"]
          sport_focus: Database["public"]["Enums"]["sport_focus"]
          terms_accepted_at: string | null
          terms_version: string | null
          unit_pref: Database["public"]["Enums"]["unit_pref"]
          updated_at: string
          weekly_session_target: number
          weight_kg: number | null
        }
        Insert: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          display_name?: string | null
          goal?: Database["public"]["Enums"]["training_goal"]
          height_cm?: number | null
          id: string
          sex?: Database["public"]["Enums"]["sex_type"]
          sport_focus?: Database["public"]["Enums"]["sport_focus"]
          terms_accepted_at?: string | null
          terms_version?: string | null
          unit_pref?: Database["public"]["Enums"]["unit_pref"]
          updated_at?: string
          weekly_session_target?: number
          weight_kg?: number | null
        }
        Update: {
          avatar_url?: string | null
          birth_date?: string | null
          created_at?: string
          display_name?: string | null
          goal?: Database["public"]["Enums"]["training_goal"]
          height_cm?: number | null
          id?: string
          sex?: Database["public"]["Enums"]["sex_type"]
          sport_focus?: Database["public"]["Enums"]["sport_focus"]
          terms_accepted_at?: string | null
          terms_version?: string | null
          unit_pref?: Database["public"]["Enums"]["unit_pref"]
          updated_at?: string
          weekly_session_target?: number
          weight_kg?: number | null
        }
        Relationships: []
      }
      reaction_drill_results: {
        Row: {
          accuracy_pct: number | null
          attempts: number
          avg_reaction_ms: number
          best_reaction_ms: number
          created_at: string
          id: string
          played_at: string
          user_id: string
        }
        Insert: {
          accuracy_pct?: number | null
          attempts: number
          avg_reaction_ms: number
          best_reaction_ms: number
          created_at?: string
          id?: string
          played_at?: string
          user_id: string
        }
        Update: {
          accuracy_pct?: number | null
          attempts?: number
          avg_reaction_ms?: number
          best_reaction_ms?: number
          created_at?: string
          id?: string
          played_at?: string
          user_id?: string
        }
        Relationships: []
      }
      training_plans: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          plan_json: Json
          sessions_per_week: number
          source: Database["public"]["Enums"]["plan_source"]
          sport: Database["public"]["Enums"]["plan_sport"]
          start_date: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          plan_json: Json
          sessions_per_week: number
          source?: Database["public"]["Enums"]["plan_source"]
          sport: Database["public"]["Enums"]["plan_sport"]
          start_date?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          plan_json?: Json
          sessions_per_week?: number
          source?: Database["public"]["Enums"]["plan_source"]
          sport?: Database["public"]["Enums"]["plan_sport"]
          start_date?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          progress: Json | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          progress?: Json | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          progress?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      evaluate_achievements: { Args: { p_user_id: string }; Returns: undefined }
    }
    Enums: {
      achievement_sport: "basketball" | "gym" | "both"
      basketball_session_type:
        | "game"
        | "practice"
        | "shooting"
        | "drills"
        | "conditioning"
      gym_session_type: "strength" | "cardio" | "mobility" | "sport_specific"
      message_role: "user" | "assistant" | "system"
      milestone_type:
        | "session_streak"
        | "session_count"
        | "pr_weight"
        | "shooting_pct"
        | "reaction_time"
      plan_source: "template" | "ai" | "manual"
      plan_sport: "basketball" | "gym"
      sex_type: "male" | "female" | "unspecified"
      sport_focus: "basketball" | "gym" | "both"
      training_goal:
        | "lose_weight"
        | "maintain"
        | "gain_muscle"
        | "improve_performance"
      unit_pref: "metric" | "imperial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      achievement_sport: ["basketball", "gym", "both"],
      basketball_session_type: [
        "game",
        "practice",
        "shooting",
        "drills",
        "conditioning",
      ],
      gym_session_type: ["strength", "cardio", "mobility", "sport_specific"],
      message_role: ["user", "assistant", "system"],
      milestone_type: [
        "session_streak",
        "session_count",
        "pr_weight",
        "shooting_pct",
        "reaction_time",
      ],
      plan_source: ["template", "ai", "manual"],
      plan_sport: ["basketball", "gym"],
      sex_type: ["male", "female", "unspecified"],
      sport_focus: ["basketball", "gym", "both"],
      training_goal: [
        "lose_weight",
        "maintain",
        "gain_muscle",
        "improve_performance",
      ],
      unit_pref: ["metric", "imperial"],
    },
  },
} as const
