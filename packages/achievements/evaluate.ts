import type { Achievement } from "@athlete/types"

/**
 * Mirrors the server-side `evaluate_achievements` Postgres function so the UI
 * can show an instant "unlocked!" celebration right after an insert, without
 * waiting on a refetch. The database trigger remains the source of truth for
 * what's actually persisted to `user_achievements` - this is purely for
 * optimistic client feedback and must stay in sync with the same criteria.
 */
export type UserStatsSnapshot = {
  basketballSessionCount: number
  gymSessionCount: number
  /** Distinct training days within the last 7 days, across both sports. */
  streakDaysLast7: number
  bestReactionMs: number | null
  hasPersonalRecord: boolean
  /** Best single-session shooting percentage (0-1) among sessions with at least 10 attempts. */
  bestShootingPctMin10: number | null
  /** Best single-session shooting percentage (0-1) among sessions with at least 15 attempts. */
  bestShootingPctMin15: number | null
  /** Highest points scored in a single session with session_type "game". */
  bestGamePoints: number | null
  /** Highest weight (kg) ever logged for a set whose exercise name matches "bench". */
  bestBenchKg: number | null
  /** Highest weight (kg) ever logged for a set whose exercise name matches "squat". */
  bestSquatKg: number | null
  /** Highest weight (kg) ever logged for a set whose exercise name matches "deadlift". */
  bestDeadliftKg: number | null
}

type SessionCountCriteria = { type: "session_count"; sport: "basketball" | "gym"; count: number }
type StreakCriteria = { type: "streak"; days: number }
type ReactionTimeCriteria = { type: "reaction_time"; max_ms: number }
type PrCriteria = { type: "pr" }
type ShootingPctCriteria = { type: "shooting_pct"; min_attempts: number; min_pct: number }
type SingleGamePointsCriteria = { type: "single_game_points"; min_points: number }
type LiftWeightCriteria = {
  type: "lift_weight"
  exercise_pattern: "bench" | "squat" | "deadlift"
  min_kg: number
}

export type AchievementCriteria =
  | SessionCountCriteria
  | StreakCriteria
  | ReactionTimeCriteria
  | PrCriteria
  | ShootingPctCriteria
  | SingleGamePointsCriteria
  | LiftWeightCriteria

function isCriteriaMet(criteria: AchievementCriteria, stats: UserStatsSnapshot): boolean {
  switch (criteria.type) {
    case "session_count": {
      const count =
        criteria.sport === "basketball" ? stats.basketballSessionCount : stats.gymSessionCount
      return count >= criteria.count
    }
    case "streak":
      return stats.streakDaysLast7 >= criteria.days
    case "reaction_time":
      return stats.bestReactionMs !== null && stats.bestReactionMs <= criteria.max_ms
    case "pr":
      return stats.hasPersonalRecord
    case "shooting_pct": {
      const best =
        criteria.min_attempts >= 15 ? stats.bestShootingPctMin15 : stats.bestShootingPctMin10
      return best !== null && best >= criteria.min_pct
    }
    case "single_game_points":
      return stats.bestGamePoints !== null && stats.bestGamePoints >= criteria.min_points
    case "lift_weight": {
      const best =
        criteria.exercise_pattern === "bench"
          ? stats.bestBenchKg
          : criteria.exercise_pattern === "squat"
            ? stats.bestSquatKg
            : stats.bestDeadliftKg
      return best !== null && best >= criteria.min_kg
    }
    default:
      return false
  }
}

/** Returns achievements newly satisfied by `stats` that aren't already in `earnedCodes`. */
export function getNewlyUnlockedAchievements(
  achievements: Achievement[],
  stats: UserStatsSnapshot,
  earnedCodes: ReadonlySet<string>
): Achievement[] {
  return achievements.filter((achievement) => {
    if (earnedCodes.has(achievement.code)) return false
    return isCriteriaMet(achievement.criteria as unknown as AchievementCriteria, stats)
  })
}
