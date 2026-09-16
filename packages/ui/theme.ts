export type Theme = {
  accent: string
  accentMuted: string
  background: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  border: string
  success: string
  danger: string
  spacing: (multiplier: number) => number
  radius: { sm: number; md: number; lg: number; pill: number }
  fontSize: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number }
}

function buildTheme(accent: string, accentMuted: string): Theme {
  return {
    accent,
    accentMuted,
    background: "#0B0E13",
    surface: "#161B22",
    surfaceAlt: "#1F2630",
    text: "#F2F4F7",
    textMuted: "#8B96A5",
    border: "#2A323D",
    success: "#3DDC97",
    danger: "#FF5C5C",
    spacing: (multiplier: number) => multiplier * 8,
    radius: { sm: 6, md: 12, lg: 20, pill: 999 },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 26, xxl: 34 },
  }
}

/** Basketball app: high-energy orange accent. */
export const basketballTheme: Theme = buildTheme("#FF7A1A", "#4D2E17")

/** Gym app: steel-blue accent. */
export const gymTheme: Theme = buildTheme("#3B82F6", "#1E2F4D")
