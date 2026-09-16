---
version: 1
slug: "app-tabs-index-tsx"
primary_target: "app/(tabs)/index.tsx"
related_targets: ["packages/ui/theme.ts","app/(tabs)/_layout.tsx"]
---

## Scope and visitor mode

Operate. Global redesign: shared theme/component system (`packages/ui`) plus the Home screen, bottom navigation, and a new Choose-Workout flow in `apps/basketball`. Every other existing screen (Log, History, session detail, Achievements, Profile, Edit Profile, Plan, Nutrition, legal pages, auth) inherits the same tokens and component language once committed, rather than being redesigned individually.

## Audience, job, action/task, proof/content, constraints

A solo basketball player opens the app after or before training to log a session, check their plan, or start a workout flow. Primary task per visit is usually one of: log what just happened, or start training now. Constraint: this is a working production Expo/React Native codebase (plain StyleSheet-in-JS, no Tailwind), backed by a live Supabase project with real data — the redesign must not break any existing query, route, or mutation, only restyle and reorganize navigation.

## Direction contract

THESIS: The app should feel like a physical basketball object — hardwood, leather, backboard, chalk — not a generic wellness-app dashboard of six equal pastel tiles. It refuses the calm-blue/teal fitness-app palette and the same-size icon+heading+text card grid as the page's whole structure.

OWN-WORLD: Warm parchment/hardwood cream ground (#efe3c4). Dark-brown ink (#42302d) carries borders, text, and the backboard-glyph logo mark. Basketball-leather orange (#ea662c) is the one loud accent, spent on exactly one primary action per screen (never scattered across icons or scattered badges). Deep court-green (#26422a) is reserved for secondary/positive signal only (success states, unlocked achievements, PR badges) — never a primary CTA color. Every contained surface (card, button, input, tab bar) carries a uniform 3px dark-brown border, flat fill, no gradients, generous 16-20px corner radius. Depth comes from a soft, offset drop shadow under primary surfaces, never a flat colored glow. Display/heading type: Plus Jakarta Sans, bold/extrabold; body: Plus Jakarta Sans medium/regular. Icons: Ionicons (already in use), single consistent stroke weight, dark-brown or orange, never mixed with emoji.

STORY: A player opens the app and sees one unmissable action — the circular "workout" button — rather than a dashboard of equally-weighted tiles. Everything else (drills, plan, achievements, nutrition, profile) is present but visually quieter, reachable in one tap, never competing with the primary action.

FIRST VIEWPORT (Home): Header row — hoop-glyph mark + "DimeSkill" wordmark, left-aligned, on the cream ground. Below: the large circular "workout" CTA (dark-brown fill, thick orange ring, white play-triangle glyph, "workout" label), centered and dominant — pressing it opens Choose Workout. Below that: a two-up row of thick-bordered cream cards (left: quick link into Drills/History, right: quick link into Achievements & PRs). Bottom tab bar: 5 items in this exact order — Home, History, Log, Achievements, Profile — with Log rendered as an elevated circular orange badge breaking the tab bar's top edge, visually distinct from the other 4 flat tab items.

New flow: the workout CTA opens a Choose Workout screen with four options in the same thick-bordered card language: Full Workout, Skill-Based Workout (expands to Dribbling / Catch & Shoot / Off-the-Dribble Shots), Reaction Trainer (the existing reaction-speed drill, moved here from its own tab), and Decision Trainer (visually present but disabled/"coming soon", not yet functional).

FORM: Warm equipment-object world — thick uniform borders, flat color blocks, one spent accent, generous radius. User-pinned directly via a supplied mockup screenshot, an exact 4-color hex palette, and real logo files (not generated or selected via a candidate roll — this is a precisely specified request per new-work.md's direct-shape path, not an open direction invention).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved decisions

- Exact Choose-Workout sub-flow screens for Dribbling / Catch & Shoot / Off-the-Dribble Shots beyond entry points (deferred — user said these are for later; entry points only for now).
- Decision Trainer has no functionality yet by design (explicit user instruction: "we will finish later").
