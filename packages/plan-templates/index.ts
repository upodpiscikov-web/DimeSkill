import type { PlanSport, PlanTemplate } from "./types"
import { GYM_TEMPLATES } from "./gym"
import { BASKETBALL_TEMPLATES } from "./basketball"

export * from "./types"
export { GYM_TEMPLATES } from "./gym"
export { BASKETBALL_TEMPLATES } from "./basketball"

const MIN_SESSIONS = 2
const MAX_SESSIONS = 6

/** Returns the template for the given frequency, clamped to the supported 2-6/week range. */
export function getPlanTemplate(sport: PlanSport, sessionsPerWeek: number): PlanTemplate {
  const clamped = Math.min(MAX_SESSIONS, Math.max(MIN_SESSIONS, Math.round(sessionsPerWeek)))
  const table = sport === "gym" ? GYM_TEMPLATES : BASKETBALL_TEMPLATES
  return table[clamped]
}
