export * from "./database"
import type { Tables } from "./database"

export type Profile = Tables<"profiles">
export type BasketballSession = Tables<"basketball_sessions">
export type BasketballDrill = Tables<"basketball_drills">
export type ReactionDrillResult = Tables<"reaction_drill_results">
export type GymSession = Tables<"gym_sessions">
export type GymExerciseSet = Tables<"gym_exercise_sets">
export type Achievement = Tables<"achievements">
export type UserAchievement = Tables<"user_achievements">
export type Milestone = Tables<"milestones">
export type TrainingPlan = Tables<"training_plans">
export type AiCoachConversation = Tables<"ai_coach_conversations">
export type AiCoachMessage = Tables<"ai_coach_messages">
export type MealPlan = Tables<"meal_plans">
export type FoodLogEntry = Tables<"food_log_entries">
