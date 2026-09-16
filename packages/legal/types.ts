export type LegalConfig = {
  appName: string
  companionAppName: string
  operatorName: string
  contactEmail: string
  jurisdiction: string
  region: string
}

export type LegalSection = {
  heading: string
  body: string[]
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
}
