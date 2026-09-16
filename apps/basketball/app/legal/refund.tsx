import { getRefundPolicy } from "@athlete/legal"
import { LegalDocumentView } from "@athlete/ui"
import { LEGAL_CONFIG } from "../../lib/legal"

export default function RefundPolicyScreen() {
  return <LegalDocumentView document={getRefundPolicy(LEGAL_CONFIG)} />
}
