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
}

type SessionCountCriteria = { type: "session_count"; sport: "basketball" | "gym"; count: number }
type StreakCriteria = { type: "streak"; days: number }
type ReactionTimeCriteria = { type: "reaction_time"; max_ms: number }
type PrCriteria = { type: "pr" }

export type AchievementCriteria =
  | SessionCountCriteria
  | StreakCriteria
  | ReactionTimeCriteria
  | PrCriteria

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
