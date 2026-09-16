# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

Genuinely native on iOS and Android via Expo/React Native (not a webview wrapper), plus a secondary web export used for development and preview. The user explicitly confirmed the design language itself should NOT fork per OS: one consistent visual system renders identically on iOS, Android, and web. "Adaptive" here records that native (not web-wrapper) interaction conventions apply on both native platforms, not that the visual skin diverges by OS.

## Users

Individual basketball players — youth/amateur, self-directed — training on their own outside of (or in addition to) organized team practice. This is a personal skill-tracking tool for the player themselves, not a coach- or team-facing product; there is no roster, no multi-athlete view, no coach role anywhere in the data model or screens.

## Product Purpose

Lets a player log training sessions (games, practice, shooting, drills, conditioning) with basketball-specific stats (shots made/attempted, points scored, individual drill reps/makes), follow a structured weekly training plan matched to their available frequency, earn skill-based achievement badges tied to real performance thresholds, and track nutrition/calorie targets that support their training goal. Success looks like: sessions logged consistently over time, visible improvement in shooting percentage and other tracked stats, and skill badges earned that reflect real on-court performance rather than just attendance.

## Positioning

Not a generic fitness tracker wearing a basketball skin. Where a generic app would log "workout minutes," DimeSkill logs shots made/attempted, points scored, and named drills (free throws, ball-handling reps) — and its achievement system rewards basketball-specific performance milestones (shooting percentage thresholds, points in a game) with basketball-culture badge naming (in the spirit of NBA 2K's badge system: Sniper, Deadeye, Bucket Getter), not generic fitness-app milestones.

## Operating Context

Used solo, typically logged during or right after an individual training session — on court right after finishing, or at home afterward. Shares one Supabase backend and one login system with a companion gym-training app ("IronPath" / apps/gym in the same monorepo); a user's profile (height, weight, birth date, sex, training objective, experience level) is shared across both apps, but basketball and gym activity data are stored and displayed separately.

## Capabilities and Constraints

- Stack: Expo Router (React Native), plain `StyleSheet`-in-JS via a shared `@athlete/ui` component/theme package (no Tailwind/NativeWind) — consumed by ~15 screens today. Supabase (Postgres with row-level security) for auth, data, and Postgres-trigger-driven achievement evaluation.
- Primary distribution target is native mobile (iOS + Android app stores); the web export is a development/preview convenience, not the primary product surface.
- No payment processing is live yet (subscriptions are planned, not built); legal pages already state this honestly.
- AI Coach chat and AI-generated plans are designed into the data model (`ai_coach_conversations`/`ai_coach_messages` tables) but not yet built — needs an OpenRouter key set as a Supabase Edge Function secret by the user before that feature can ship.
- Deterministic (non-AI) weekly training-plan templates and a BMR/TDEE-based nutrition calculator are already built and live, scaled to 2-6 sessions/week.

## Brand Commitments

- Name: **DimeSkill**.
- Logo assets already supplied by the user at the repo root: `default.png` (square icon mark + wordmark on cream background), `cover.png` (wide banner variant), `profile.png` (wordmark only, no icon mark). The icon mark is a basketball hoop/backboard glyph.
- The user has specified exact brand colors as a binding constraint: a cream/tan base (`#efe3c4`), an orange accent (`#ea662c`), a dark green (`#26422a`), and a dark brown/ink (`#42302d`). Full application of these into a component-level visual system is new-work's responsibility, not recorded further here.
- The user supplied a reference mockup (screenshot, not saved as a file) showing a light cream Home screen with a large circular "workout" CTA and thick-bordered cards; treated as binding visual direction for new-work.

## Evidence on Hand

- A fully functional existing backend and app: real Postgres schema, working auth, session logging, achievements (evaluated by Postgres triggers, not client-side), training plans, and nutrition tracking — all verified end-to-end against the live Supabase project during this build.
- No user testimonials, press, case studies, or third-party proof exist yet, and none should be fabricated.

## Product Principles

- Individual-player tool, not team/coach software — every feature is scoped to one person's own training data.
- Basketball-specific over generic-fitness-generic: stats, drills, and achievement names should read as basketball culture, not interchangeable fitness-app boilerplate.
- One consistent design language across iOS, Android, and web — no OS-forked visual treatment.
- Real performance data drives motivation (achievements/PRs tied to actual thresholds), not participation-only badges.
- Currently free to use; monetization is planned but explicitly not yet live anywhere in product copy or legal pages.

## Accessibility & Inclusion

No specific external standard mandated by the user. An existing baseline has already been established in this codebase: WCAG-AA text/UI contrast (the theme's border color was corrected earlier for this), and `accessibilityRole`/`accessibilityLabel`/`accessibilityState` on interactive elements (buttons, checkboxes, radio-style chips, form fields). New visual work should preserve or improve this baseline, not regress it.
