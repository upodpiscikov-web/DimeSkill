import type { PlanTemplate } from "./types"

/**
 * Frequency-scaled splits following standard strength-training principles:
 * full-body when frequency is low (each muscle group gets enough total weekly
 * volume only if hit every session), moving to body-part splits as frequency
 * rises (so total weekly volume per muscle group stays high without any
 * single session running too long), with progressive overload driven by the
 * user logging weight/reps per set week over week.
 */
export const GYM_TEMPLATES: Record<number, PlanTemplate> = {
  2: {
    sport: "gym",
    sessionsPerWeek: 2,
    title: "Full Body A/B",
    rationale:
      "At 2x/week, every session should hit the whole body so each muscle group still gets trained twice weekly.",
    days: [
      {
        day: 1,
        focus: "Full Body A",
        blocks: [
          { name: "Squat", details: "4 sets x 6-8 reps" },
          { name: "Bench Press", details: "4 sets x 6-8 reps" },
          { name: "Bent-Over Row", details: "3 sets x 8-10 reps" },
          { name: "Plank", details: "3 sets x 30-45s" },
        ],
      },
      {
        day: 2,
        focus: "Full Body B",
        blocks: [
          { name: "Deadlift", details: "3 sets x 5 reps" },
          { name: "Overhead Press", details: "4 sets x 6-8 reps" },
          { name: "Lat Pulldown", details: "3 sets x 8-10 reps" },
          { name: "Walking Lunge", details: "3 sets x 10 reps/leg" },
        ],
      },
    ],
  },
  3: {
    sport: "gym",
    sessionsPerWeek: 3,
    title: "Full Body A/B/C",
    rationale:
      "3x/week full-body is the classic evidence-backed setup for building strength with a day of recovery between sessions.",
    days: [
      {
        day: 1,
        focus: "Full Body A",
        blocks: [
          { name: "Squat", details: "4 sets x 6-8 reps" },
          { name: "Bench Press", details: "4 sets x 6-8 reps" },
          { name: "Seated Row", details: "3 sets x 10 reps" },
          { name: "Plank", details: "3 sets x 45s" },
        ],
      },
      {
        day: 2,
        focus: "Full Body B",
        blocks: [
          { name: "Deadlift", details: "3 sets x 5 reps" },
          { name: "Incline Dumbbell Press", details: "3 sets x 8-10 reps" },
          { name: "Pull-Up / Assisted Pull-Up", details: "3 sets x max reps" },
          { name: "Hanging Knee Raise", details: "3 sets x 12 reps" },
        ],
      },
      {
        day: 3,
        focus: "Full Body C",
        blocks: [
          { name: "Front Squat", details: "3 sets x 8 reps" },
          { name: "Overhead Press", details: "4 sets x 6-8 reps" },
          { name: "Romanian Deadlift", details: "3 sets x 10 reps" },
          { name: "Face Pull", details: "3 sets x 15 reps" },
        ],
      },
    ],
  },
  4: {
    sport: "gym",
    sessionsPerWeek: 4,
    title: "Upper / Lower Split",
    rationale:
      "4x/week upper/lower doubles weekly volume per muscle group versus full-body, while still giving each region 48h+ recovery.",
    days: [
      {
        day: 1,
        focus: "Upper A",
        blocks: [
          { name: "Bench Press", details: "4 sets x 6-8 reps" },
          { name: "Bent-Over Row", details: "4 sets x 8-10 reps" },
          { name: "Overhead Press", details: "3 sets x 8 reps" },
          { name: "Lat Pulldown", details: "3 sets x 10 reps" },
        ],
      },
      {
        day: 2,
        focus: "Lower A",
        blocks: [
          { name: "Squat", details: "4 sets x 6-8 reps" },
          { name: "Romanian Deadlift", details: "3 sets x 10 reps" },
          { name: "Walking Lunge", details: "3 sets x 10 reps/leg" },
          { name: "Calf Raise", details: "4 sets x 15 reps" },
        ],
      },
      {
        day: 3,
        focus: "Upper B",
        blocks: [
          { name: "Incline Dumbbell Press", details: "4 sets x 8-10 reps" },
          { name: "Pull-Up / Assisted Pull-Up", details: "4 sets x max reps" },
          { name: "Lateral Raise", details: "3 sets x 12-15 reps" },
          { name: "Face Pull", details: "3 sets x 15 reps" },
        ],
      },
      {
        day: 4,
        focus: "Lower B",
        blocks: [
          { name: "Deadlift", details: "3 sets x 5 reps" },
          { name: "Front Squat", details: "3 sets x 8 reps" },
          { name: "Leg Curl", details: "3 sets x 12 reps" },
          { name: "Plank", details: "3 sets x 45-60s" },
        ],
      },
    ],
  },
  5: {
    sport: "gym",
    sessionsPerWeek: 5,
    title: "Push / Pull / Legs + Upper / Lower",
    rationale:
      "5x/week gives each push, pull, and leg pattern two exposures a week while adding a dedicated upper and lower session for extra volume.",
    days: [
      {
        day: 1,
        focus: "Push",
        blocks: [
          { name: "Bench Press", details: "4 sets x 6-8 reps" },
          { name: "Overhead Press", details: "3 sets x 8 reps" },
          { name: "Incline Dumbbell Press", details: "3 sets x 10 reps" },
          { name: "Triceps Pushdown", details: "3 sets x 12-15 reps" },
        ],
      },
      {
        day: 2,
        focus: "Pull",
        blocks: [
          { name: "Deadlift", details: "3 sets x 5 reps" },
          { name: "Bent-Over Row", details: "4 sets x 8-10 reps" },
          { name: "Lat Pulldown", details: "3 sets x 10 reps" },
          { name: "Barbell Curl", details: "3 sets x 12 reps" },
        ],
      },
      {
        day: 3,
        focus: "Legs",
        blocks: [
          { name: "Squat", details: "4 sets x 6-8 reps" },
          { name: "Romanian Deadlift", details: "3 sets x 10 reps" },
          { name: "Leg Press", details: "3 sets x 12 reps" },
          { name: "Calf Raise", details: "4 sets x 15 reps" },
        ],
      },
      {
        day: 4,
        focus: "Upper",
        blocks: [
          { name: "Incline Bench Press", details: "3 sets x 8 reps" },
          { name: "Pull-Up / Assisted Pull-Up", details: "3 sets x max reps" },
          { name: "Lateral Raise", details: "3 sets x 15 reps" },
          { name: "Face Pull", details: "3 sets x 15 reps" },
        ],
      },
      {
        day: 5,
        focus: "Lower",
        blocks: [
          { name: "Front Squat", details: "3 sets x 8 reps" },
          { name: "Walking Lunge", details: "3 sets x 10 reps/leg" },
          { name: "Leg Curl", details: "3 sets x 12 reps" },
          { name: "Plank", details: "3 sets x 60s" },
        ],
      },
    ],
  },
  6: {
    sport: "gym",
    sessionsPerWeek: 6,
    title: "Push / Pull / Legs (2x)",
    rationale:
      "6x/week runs the push/pull/legs cycle twice, maximizing weekly volume for advanced lifters who can recover at this frequency.",
    days: [
      {
        day: 1,
        focus: "Push A",
        blocks: [
          { name: "Bench Press", details: "4 sets x 6-8 reps" },
          { name: "Overhead Press", details: "3 sets x 8 reps" },
          { name: "Triceps Pushdown", details: "3 sets x 12-15 reps" },
        ],
      },
      {
        day: 2,
        focus: "Pull A",
        blocks: [
          { name: "Deadlift", details: "3 sets x 5 reps" },
          { name: "Bent-Over Row", details: "4 sets x 8-10 reps" },
          { name: "Barbell Curl", details: "3 sets x 12 reps" },
        ],
      },
      {
        day: 3,
        focus: "Legs A",
        blocks: [
          { name: "Squat", details: "4 sets x 6-8 reps" },
          { name: "Leg Press", details: "3 sets x 12 reps" },
          { name: "Calf Raise", details: "4 sets x 15 reps" },
        ],
      },
      {
        day: 4,
        focus: "Push B",
        blocks: [
          { name: "Incline Dumbbell Press", details: "4 sets x 8-10 reps" },
          { name: "Lateral Raise", details: "3 sets x 15 reps" },
          { name: "Dips", details: "3 sets x max reps" },
        ],
      },
      {
        day: 5,
        focus: "Pull B",
        blocks: [
          { name: "Pull-Up / Assisted Pull-Up", details: "4 sets x max reps" },
          { name: "Lat Pulldown", details: "3 sets x 10 reps" },
          { name: "Face Pull", details: "3 sets x 15 reps" },
        ],
      },
      {
        day: 6,
        focus: "Legs B",
        blocks: [
          { name: "Front Squat", details: "3 sets x 8 reps" },
          { name: "Romanian Deadlift", details: "3 sets x 10 reps" },
          { name: "Leg Curl", details: "3 sets x 12 reps" },
        ],
      },
    ],
  },
}
