---
name: DimeSkill
description: A basketball training tracker styled as a physical piece of equipment - hardwood, leather, and a backboard, not a wellness-app dashboard.
colors:
  hardwood-cream: "#EFE3C4"
  parchment-tan: "#E8D9B0"
  backboard-brown: "#42302D"
  chalk-cream: "#FDF8EC"
  leather-orange: "#EA662C"
  rust-orange: "#A84317"
  peach-leather: "#F2AC82"
  court-green: "#26422A"
  foul-red: "#B23A2E"
  worn-leather: "#6E5A47"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 800
    fontSize: "26px"
  heading:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 700
    fontSize: "20px"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 600
    fontSize: "14px"
  body:
    fontFamily: "system-ui, sans-serif"
    fontWeight: 400
    fontSize: "16px"
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.backboard-brown}"
    textColor: "{colors.chalk-cream}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.parchment-tan}"
    textColor: "{colors.backboard-brown}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.hardwood-cream}"
    textColor: "{colors.backboard-brown}"
    rounded: "{rounded.lg}"
    padding: "16px"
  chip-selected:
    backgroundColor: "{colors.backboard-brown}"
    textColor: "{colors.chalk-cream}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: DimeSkill

## Overview

**Creative North Star: "The Backboard and the Ball"**

DimeSkill reads as a physical basketball object, not a glossy wellness-app dashboard. The ground is hardwood/parchment cream; every contained surface - card, button, input, tab bar - carries a uniform dark-brown border, the way a backboard's frame separates it from the wall behind it. One color, leather orange, is spent rarely and deliberately: a ring around the primary CTA, a single elevated badge in the tab bar, never scattered across icons or chip fills. The system explicitly rejects the calm blue/teal wellness-app palette and the same-size icon-plus-heading-plus-text dashboard grid as a page's whole structure - the home screen has exactly one unmissable action, not six equally-weighted tiles.

This world was pinned directly by the user: an exact 4-color hex palette, a real logo mark (a basketball hoop/backboard glyph), and a reference mockup, rather than chosen from an open exploration. It was shaped directly rather than run through a candidate roll, per a precisely-specified request.

**Key Characteristics:**
- Flat color fields, uniform thick borders, soft (never hard-offset) shadows
- Orange is a spent accent, not a fill color - it never carries body or button text
- Plus Jakarta Sans for display/heading moments; system font still carries most body copy (partial-coverage today, see Typography)
- One primary action per screen, visually dominant over everything else

## Colors

Warm, earthy, high-contrast. Every color reads as a real material - hardwood, leather, chalk, backboard paint - not a UI-kit swatch.

### Primary
- **Leather Orange** (`#EA662C`): the one spent accent. Used only for the workout CTA's ring, the tab bar's elevated Log badge, and selected-state borders. Never used as a fill behind text or as text color itself (fails contrast on the cream ground).
- **Rust Orange** (`#A84317`): the text-safe stand-in for Leather Orange. Use whenever the accent needs to render as text or an icon on the cream ground (stat highlights, "View Plan" / "Log Food" links).

### Secondary
- **Backboard Brown** (`#42302D`): the system's ink. Body text, all borders, and the fill for every primary button, selected chip, and the workout CTA's circle.
- **Chalk Cream** (`#FDF8EC`): the only color that sits on top of Backboard Brown fills (button labels, the workout CTA's icon and label, the tab bar's Log "+" icon).

### Tertiary
- **Court Green** (`#26422A`): reserved for positive/success signal only - unlocked-achievement badges, PR confirmations. Never a primary CTA color.
- **Foul Red** (`#B23A2E`): errors and destructive actions (delete confirmations, validation messages).

### Neutral
- **Hardwood Cream** (`#EFE3C4`): page background and default card fill - cards are not visually elevated from the page by color, only by their border.
- **Parchment Tan** (`#E8D9B0`): the one step of elevation above the page - input fields, secondary-button fills, unselected chips.
- **Worn Leather** (`#6E5A47`): muted/secondary text. Darkened from a naive "accent-as-gray" choice specifically to clear 4.5:1 contrast on both Hardwood Cream and Parchment Tan.

### Named Rules
**The Spent Accent Rule.** Leather Orange appears at most twice on any one screen - one ring or badge, never a fill under text. If a screen wants a second orange element, that's a sign something else should carry the emphasis instead.

## Typography

**Display/Heading Font:** Plus Jakarta Sans (extrabold 800 for hero numbers and the workout CTA label; bold 700 for section headings and button labels; semibold 600 for chip and form labels)
**Body Font:** system default sans-serif (unchanged from the pre-redesign system)

**Character:** Plus Jakarta Sans is a rounded, confident geometric sans - it carries the "physical object, not a spreadsheet" feeling into every heading and number without going display-decorative. It is intentionally not yet applied to paragraph-level body copy.

### Hierarchy
- **Display** (extrabold 800, 26-34px): the workout CTA's "workout" label, StatTile values (This Week, Total Sessions), page-level hero numbers.
- **Heading** (bold 700, 20-26px): page titles ("Choose Your Workout", "Log a Session"), card section titles ("Today's Training", "Drills").
- **Label** (semibold 600, 14px): chip labels, tab bar labels, form field labels.
- **Body** (system default, regular, 14-16px): paragraph copy, list items, muted descriptions - not yet migrated to Plus Jakarta Sans.

### Named Rules
**The Partial-Coverage Honesty Rule.** Roughly a dozen screens still render body text in the system font. This is a scoping decision from the first redesign pass, not a regression - extending Plus Jakarta Sans to body copy is straightforward follow-up work, not a system change.

## Layout

8px base spacing unit (`theme.spacing(n) = n * 8`). Screen padding is 16px (`spacing(2)`) on all sides via `ScreenContainer`. Stacked sections (cards, stat rows) get 16px gaps; tightly related fields (a card's internal label/value pairs) get 4-8px. Two-up rows (the Drills/Achievements cards, StatTile pairs) use a 12px (`spacing(1.5)`) gutter and equal-width flex children.

## Elevation & Depth

Soft, offset shadows - never a flat colored glow, never a hard zero-blur "neobrutalist" block shadow. The shadow token (`shadowColor: #42302D, offset: 0/4, opacity: 0.18, radius: 6, elevation: 4`) is spent on: the primary-button fill, the workout CTA circle, and the elevated Log tab-bar badge. Ordinary cards do not carry a shadow - their separation from the page comes entirely from the uniform border, keeping the page from feeling like a pile of floating panels.

### Shadow Vocabulary
- **Primary elevation** (`shadowColor: #42302D, offset: {0,4}, opacity: 0.18, radius: 6`): the workout CTA, primary buttons, the Log tab badge - anything that is *the* action on its surface.

### Named Rules
**The Border-Not-Shadow Rule.** Cards separate from the page via a 3px border, not elevation. Shadow is reserved for things you press, not things you read.

## Shapes

Uniform 3px Backboard Brown border on every contained surface: cards, buttons (except primary, which is borderless and relies on its dark fill), text inputs, chips, the tab bar's top edge. Corner radius scales with a surface's size: 10px for small controls, 16px for buttons and inputs, 24px for cards, pill (999px) for chips and the circular CTA/badge. No sharp corners anywhere in the system.

## Components

### Buttons
- **Shape:** 16px radius, no border on primary; 3px Backboard Brown border on secondary/ghost.
- **Primary:** Backboard Brown fill, Chalk Cream text (extrabold-weight label), soft shadow. This is the only button variant that carries the primary elevation shadow.
- **Secondary:** Parchment Tan fill, Backboard Brown border and text, no shadow.
- **Ghost:** transparent fill, Backboard Brown border and text.

### Chips
- **Style:** pill-shaped, 3px border.
- **State:** selected = Backboard Brown fill + Chalk Cream text (matches primary button treatment intentionally - "selected" and "primary action" share one visual vocabulary); unselected = Parchment Tan fill + Backboard Brown border/text.

### Cards / Containers
- **Corner Style:** 24px radius (`rounded.lg`).
- **Background:** Hardwood Cream (same as page - no elevation-by-color).
- **Shadow Strategy:** none at rest; see Elevation & Depth.
- **Border:** 3px Backboard Brown, always.
- **Internal Padding:** 16px (`spacing(2)`).

### Inputs / Fields
- **Style:** Parchment Tan fill, 3px Backboard Brown border, 16px radius.
- **Label:** Worn Leather, semibold, above the field.
- **Placeholder:** Worn Leather.

### Navigation
Bottom tab bar, 5 items: Home, History, Log, Achievements, Profile - in that fixed order. Home/History/Achievements/Profile render as a standard icon-over-label pair (Backboard Brown when active, Worn Leather inactive, Plus Jakarta Sans semibold label, wraps to two lines rather than truncating long labels). Log is not a standard tab item: it renders as a 52px Leather-Orange circle with a Chalk-Cream "+" icon, bordered and shadowed, breaking above the tab bar's top edge - the tab bar's one deliberate exception to "orange is rare."

### The Workout CTA (signature component)
A 168px circle, centered below the header on Home: Backboard Brown fill, 5px Leather Orange ring, a Chalk-Cream play-triangle icon and "workout" label (extrabold). This is the screen's one unmissable action, and the only place on Home that is not a bordered rectangle - its circularity is what makes it read as *the* button rather than another card.

## Do's and Don'ts

### Do:
- **Do** use Rust Orange (`#A84317`), never Leather Orange, when the accent needs to render as text or a small icon on the cream ground - raw Leather Orange fails WCAG contrast there.
- **Do** keep the 3px Backboard Brown border on every new contained surface; a borderless card is a system violation, not a style choice.
- **Do** reuse the Backboard-Brown-fill-plus-Chalk-Cream-text pairing for any new "selected" or "primary" state rather than introducing a new color pairing.

### Don't:
- **Don't** fill a button, chip, or any text-bearing surface with Leather Orange directly - it is a ring/badge/border color only.
- **Don't** add a colored `border-left` accent stripe, a kicker/eyebrow label, or a hard zero-blur drop shadow anywhere in this system - none of them belong to this world.
- **Don't** apply this palette or these tokens to `apps/gym` (IronPath). It still runs the original dark theme (`gymTheme` in `packages/ui/theme.ts`) pending its own redesign pass; the two themes are now fully independent objects in the same file specifically so one can change without the other.
