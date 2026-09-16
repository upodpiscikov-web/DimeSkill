import { getPrivacyPolicy } from "@athlete/legal"
import { LegalDocumentView } from "@athlete/ui"
import { LEGAL_CONFIG } from "../../lib/legal"

export default function PrivacyPolicyScreen() {
  return <LegalDocumentView document={getPrivacyPolicy(LEGAL_CONFIG)} />
}
