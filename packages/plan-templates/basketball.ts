import type { PlanTemplate } from "./types"

/**
 * Frequency-scaled mix of skill work, live play, conditioning, and strength/
 * athleticism, with recovery days scaled to volume - more sessions means more
 * differentiation (dedicated conditioning/strength days) rather than just
 * repeating the same generic practice.
 */
export const BASKETBALL_TEMPLATES: Record<number, PlanTemplate> = {
  2: {
    sport: "basketball",
    sessionsPerWeek: 2,
    title: "Skill + Live Play",
    rationale:
      "At 2x/week, prioritize ball skills (the highest-value, most trainable element) plus one session of live/competitive play to apply them under pressure.",
    days: [
      {
        day: 1,
        focus: "Skill Development",
        blocks: [
          { name: "Ball Handling", details: "15 min - two-ball dribbling, cone weaves" },
          { name: "Shooting Form + Reps", details: "40 min - form shooting, spot-up, off-the-dribble" },
          { name: "Reaction Speed Drill", details: "10 min - random-color reaction drill" },
        ],
      },
      {
        day: 2,
        focus: "Live Play / Scrimmage",
        blocks: [
          { name: "Dynamic Warm-Up", details: "10 min" },
          { name: "Scrimmage or Pickup Game", details: "45-60 min" },
          { name: "Free Throws Cooldown", details: "10 min - 2 sets of 10" },
        ],
      },
    ],
  },
  3: {
    sport: "basketball",
    sessionsPerWeek: 3,
    title: "Skill / Play / Conditioning",
    rationale:
      "3x/week separates skill work, competitive play, and conditioning so each gets full attention instead of being squeezed together.",
    days: [
      {
        day: 1,
        focus: "Shooting & Ball Handling",
        blocks: [
          { name: "Ball Handling", details: "15 min" },
          { name: "Shooting Progression", details: "40 min - form, mid-range, three-point" },
          { name: "Reaction Speed Drill", details: "10 min" },
        ],
      },
      {
        day: 2,
        focus: "Live Play",
        blocks: [
          { name: "Dynamic Warm-Up", details: "10 min" },
          { name: "Scrimmage / 1-on-1 / 3-on-3", details: "45-60 min" },
        ],
      },
      {
        day: 3,
        focus: "Conditioning & Footwork",
        blocks: [
          { name: "Defensive Slides & Closeouts", details: "15 min" },
          { name: "Interval Sprints", details: "20 min - suicides / lane sprints" },
          { name: "Finishing at the Rim", details: "15 min - layup packages both hands" },
        ],
      },
    ],
  },
  4: {
    sport: "basketball",
    sessionsPerWeek: 4,
    title: "Skill / Play / Strength / Conditioning",
    rationale:
      "4x/week adds a dedicated athletic-strength day - basketball performance plateaus without off-court strength work once on-court volume rises.",
    days: [
      {
        day: 1,
        focus: "Ball Handling & Shooting",
        blocks: [
          { name: "Ball Handling", details: "15 min" },
          { name: "Shooting Progression", details: "40 min" },
          { name: "Reaction Speed Drill", details: "10 min" },
        ],
      },
      {
        day: 2,
        focus: "Live Play",
        blocks: [
          { name: "Dynamic Warm-Up", details: "10 min" },
          { name: "Scrimmage / Pickup", details: "45-60 min" },
        ],
      },
      {
        day: 3,
        focus: "Athletic Strength",
        blocks: [
          { name: "Squat or Trap Bar Deadlift", details: "4 sets x 6 reps" },
          { name: "Box Jumps", details: "4 sets x 5 reps" },
          { name: "Single-Leg RDL", details: "3 sets x 8 reps/leg" },
          { name: "Core Circuit", details: "10 min" },
        ],
      },
      {
        day: 4,
        focus: "Conditioning & Finishing",
        blocks: [
          { name: "Defensive Footwork", details: "15 min" },
          { name: "Interval Sprints", details: "20 min" },
          { name: "Finishing Packages", details: "15 min" },
        ],
      },
    ],
  },
  5: {
    sport: "basketball",
    sessionsPerWeek: 5,
    title: "High-Volume Skill Development",
    rationale:
      "5x/week splits shooting into distinct sub-skills (catch-and-shoot vs. off-the-dribble) since one generic shooting day can't cover enough reps of each at this volume.",
    days: [
      {
        day: 1,
        focus: "Catch-and-Shoot",
        blocks: [
          { name: "Spot-Up Shooting", details: "40 min - all five spots, game-speed" },
          { name: "Reaction Speed Drill", details: "10 min" },
        ],
      },
      {
        day: 2,
        focus: "Live Play",
        blocks: [
          { name: "Dynamic Warm-Up", details: "10 min" },
          { name: "Scrimmage / Pickup", details: "45-60 min" },
        ],
      },
      {
        day: 3,
        focus: "Athletic Strength",
        blocks: [
          { name: "Squat or Trap Bar Deadlift", details: "4 sets x 6 reps" },
          { name: "Box Jumps", details: "4 sets x 5 reps" },
          { name: "Single-Leg RDL", details: "3 sets x 8 reps/leg" },
        ],
      },
      {
        day: 4,
        focus: "Off-the-Dribble & Ball Handling",
        blocks: [
          { name: "Advanced Ball Handling", details: "15 min" },
          { name: "Off-the-Dribble Shooting", details: "35 min - pull-ups, step-backs" },
        ],
      },
      {
        day: 5,
        focus: "Conditioning & Finishing",
        blocks: [
          { name: "Defensive Footwork", details: "15 min" },
          { name: "Interval Sprints", details: "20 min" },
          { name: "Finishing Packages", details: "15 min" },
        ],
      },
    ],
  },
  6: {
    sport: "basketball",
    sessionsPerWeek: 6,
    title: "Competitive Player Program",
    rationale:
      "6x/week is high volume - one day is deliberately mobility/recovery-focused to manage injury risk while keeping the other five sessions sharp and specific.",
    days: [
      {
        day: 1,
        focus: "Catch-and-Shoot",
        blocks: [
          { name: "Spot-Up Shooting", details: "40 min" },
          { name: "Reaction Speed Drill", details: "10 min" },
        ],
      },
      {
        day: 2,
        focus: "Live Play",
        blocks: [
          { name: "Dynamic Warm-Up", details: "10 min" },
          { name: "Scrimmage / Pickup", details: "45-60 min" },
        ],
      },
      {
        day: 3,
        focus: "Athletic Strength",
        blocks: [
          { name: "Squat or Trap Bar Deadlift", details: "4 sets x 6 reps" },
          { name: "Box Jumps", details: "4 sets x 5 reps" },
          { name: "Single-Leg RDL", details: "3 sets x 8 reps/leg" },
        ],
      },
      {
        day: 4,
        focus: "Off-the-Dribble & Ball Handling",
        blocks: [
          { name: "Advanced Ball Handling", details: "15 min" },
          { name: "Off-the-Dribble Shooting", details: "35 min" },
        ],
      },
      {
        day: 5,
        focus: "Conditioning & Finishing",
        blocks: [
          { name: "Defensive Footwork", details: "15 min" },
          { name: "Interval Sprints", details: "20 min" },
          { name: "Finishing Packages", details: "15 min" },
        ],
      },
      {
        day: 6,
        focus: "Mobility & Recovery",
        blocks: [
          { name: "Full-Body Mobility Flow", details: "25 min" },
          { name: "Light Shooting", details: "20 min - free throws and form shooting only" },
        ],
      },
    ],
  },
}
