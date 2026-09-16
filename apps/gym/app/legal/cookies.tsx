import { getCookiesPolicy } from "@athlete/legal"
import { LegalDocumentView } from "@athlete/ui"
import { LEGAL_CONFIG } from "../../lib/legal"

export default function CookiesPolicyScreen() {
  return <LegalDocumentView document={getCookiesPolicy(LEGAL_CONFIG)} />
}
