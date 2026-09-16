import { getTerms } from "@athlete/legal"
import { LegalDocumentView } from "@athlete/ui"
import { LEGAL_CONFIG } from "../../lib/legal"

export default function TermsScreen() {
  return <LegalDocumentView document={getTerms(LEGAL_CONFIG)} />
}
