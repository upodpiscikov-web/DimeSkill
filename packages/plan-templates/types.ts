export type PlanSport = "basketball" | "gym"

export type PlanBlock = {
  name: string
  details: string
}

export type PlanDay = {
  day: number
  focus: string
  blocks: PlanBlock[]
}

export type PlanTemplate = {
  sport: PlanSport
  sessionsPerWeek: number
  title: string
  /** Why this structure, in plain terms - shown to the user so the plan isn't a black box. */
  rationale: string
  days: PlanDay[]
}
