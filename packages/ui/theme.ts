export type Theme = {
  accent: string
  accentMuted: string
  /** Accent-family color safe to use as text/foreground on `background` (may be darker than `accent`, which is tuned for fills/rings where contrast comes from elsewhere). */
  accentText: string
  onAccent: string
  /** Fill color for the primary CTA/button surface (may differ from `accent`, which is reserved for rings, badges, and small highlights). */
  primarySurface: string
  onPrimarySurface: string
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
  borderWidth: number
  fontFamily: {
    regular?: string
    medium?: string
    semibold?: string
    bold?: string
    extrabold?: string
  }
  shadow: {
    shadowColor: string
    shadowOffset: { width: number; height: number }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
}

function buildTheme(accent: string, accentMuted: string): Theme {
  return {
    accent,
    accentMuted,
    accentText: accent,
    onAccent: "#111318",
    primarySurface: accent,
    onPrimarySurface: "#111318",
    background: "#0B0E13",
    surface: "#161B22",
    surfaceAlt: "#1F2630",
    text: "#F2F4F7",
    textMuted: "#8B96A5",
    border: "#687687",
    success: "#3DDC97",
    danger: "#FF5C5C",
    spacing: (multiplier: number) => multiplier * 8,
    radius: { sm: 6, md: 12, lg: 20, pill: 999 },
    fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 26, xxl: 34 },
    borderWidth: 1,
    fontFamily: {},
    shadow: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  }
}

/** Gym app: dark theme, steel-blue accent. Unchanged pending its own redesign pass. */
export const gymTheme: Theme = buildTheme("#3B82F6", "#1E2F4D")

/**
 * Basketball app (DimeSkill): warm hardwood/leather world - cream ground, dark-brown
 * ink and borders, one orange accent. User-pinned via mockup + exact palette + logo,
 * not a shared dark-theme derivative.
 */
export const basketballTheme: Theme = {
  accent: "#EA662C",
  accentMuted: "#F2AC82",
  accentText: "#A84317",
  onAccent: "#42302D",
  primarySurface: "#42302D",
  onPrimarySurface: "#FDF8EC",
  background: "#EFE3C4",
  surface: "#EFE3C4",
  surfaceAlt: "#E8D9B0",
  text: "#42302D",
  textMuted: "#6E5A47",
  border: "#42302D",
  success: "#26422A",
  danger: "#B23A2E",
  spacing: (multiplier: number) => multiplier * 8,
  radius: { sm: 10, md: 16, lg: 24, pill: 999 },
  fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 26, xxl: 34 },
  borderWidth: 3,
  fontFamily: {
    regular: "PlusJakartaSans_400Regular",
    medium: "PlusJakartaSans_500Medium",
    semibold: "PlusJakartaSans_600SemiBold",
    bold: "PlusJakartaSans_700Bold",
    extrabold: "PlusJakartaSans_800ExtraBold",
  },
  shadow: {
    shadowColor: "#42302D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
}
