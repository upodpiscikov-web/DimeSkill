import { Linking, Platform } from "react-native"
import { router } from "expo-router"
import type { LegalConfig } from "@athlete/legal"

export const LEGAL_CONFIG: LegalConfig = {
  appName: "DimeSkill",
  companionAppName: "our gym training app",
  operatorName: "Andrei Bondarenco, an individual",
  contactEmail: "upodpiscikov@gmail.com",
  jurisdiction: "the Republic of Moldova",
  region: "EU (eu-central-1)",
}

const WEB_BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL

export type LegalPage = "privacy" | "terms" | "cookies" | "refund"

export function openLegalPage(page: LegalPage) {
  if (Platform.OS === "web" || !WEB_BASE_URL) {
    router.push(`/legal/${page}`)
  } else {
    Linking.openURL(`${WEB_BASE_URL}/legal/${page}`)
  }
}
