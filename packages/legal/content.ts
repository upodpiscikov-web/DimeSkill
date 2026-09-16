import type { LegalConfig, LegalDocument } from "./types"

export const LEGAL_DOCUMENT_VERSION = "2026-09-16"
export const LAST_UPDATED_LABEL = "September 16, 2026"

export function getPrivacyPolicy(config: LegalConfig): LegalDocument {
  const { appName, companionAppName, operatorName, contactEmail, jurisdiction, region } = config

  return {
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED_LABEL,
    intro: `This Privacy Policy explains how ${operatorName} ("we", "us") collects, uses, and protects your personal data when you use ${appName} (the "App"). ${appName} shares a single account system with our companion app, ${companionAppName} — if you use both, your login and profile are shared, though your basketball and gym activity data are kept separate.`,
    sections: [
      {
        heading: "1. Who we are",
        body: [
          `${operatorName} is the data controller responsible for your personal data. ${operatorName} operates as an individual, based in ${jurisdiction}.`,
          `Contact: ${contactEmail}`,
        ],
      },
      {
        heading: "2. What we collect",
        body: [
          "Account data: your email address and password. Passwords are hashed by our authentication provider — we never see or store your plaintext password.",
          "Profile data you choose to provide: display name, birth date, sex, height, and weight. These are entirely optional and are only used to calculate calorie and macro targets in the nutrition features.",
          "Activity data: training sessions you log (type, duration, notes), gym exercise sets (reps, weight), basketball shooting stats, reaction-speed drill results, and the achievements and milestones you earn.",
          "AI Coach data (once that feature is available): if you use the AI coach chat or request an AI-generated plan, the message you send and relevant profile/activity context are sent to our AI infrastructure provider to generate a response. We will show a clear notice the first time you use this feature.",
        ],
      },
      {
        heading: "3. What we don't collect",
        body: [
          "We do not access your contacts, camera, microphone, or precise location.",
          "We do not use advertising identifiers.",
          "We do not currently use any third-party analytics or advertising trackers.",
          "We do not sell your personal data to anyone.",
        ],
      },
      {
        heading: "4. How we use your data",
        body: [
          "To operate the App: create your account, save your logged sessions, and calculate your stats, achievements, and milestones.",
          "To power optional features you choose to use, such as AI-generated training or meal plans.",
          "To respond to support requests you send us.",
          "To maintain basic security logs (e.g. sign-in timestamps) to protect against abuse.",
        ],
      },
      {
        heading: "5. Legal basis for processing",
        body: [
          "We process your account and profile data on the basis of the contract we enter into with you when you create an account (providing the service you signed up for), and your consent, given when you accept these terms during sign-up.",
          "Optional health-related profile fields (birth date, sex, height, weight) are processed only with your explicit action of entering them — leaving them blank means they are never collected.",
        ],
      },
      {
        heading: "6. Where your data is stored",
        body: [
          `Your data is stored in a managed Postgres database hosted in the ${region} region. Every table enforces row-level security, meaning the database itself blocks any user from reading or modifying another user's data — not just the app's interface.`,
        ],
      },
      {
        heading: "7. Who we share data with",
        body: [
          "Supabase, our database, authentication, and hosting provider, which processes data on our behalf under its own data processing terms.",
          "OpenRouter and the underlying AI model provider it routes to — only for the specific message or plan request you submit through the AI Coach feature, and only once that feature is live.",
          "We do not share your data with advertisers or data brokers.",
        ],
      },
      {
        heading: "8. International data transfers",
        body: [
          `Because we welcome users from anywhere in the world but host infrastructure in the ${region} region, using the App means your data is transferred to and processed there, regardless of where you are.`,
        ],
      },
      {
        heading: "9. Your rights",
        body: [
          "Depending on where you live, you may have the right to access, correct, delete, or export your personal data, and to object to or withdraw consent for certain processing.",
          `To exercise any of these rights, email ${contactEmail}. We will respond within a reasonable time and, in any event, within the timeframe required by applicable law.`,
          "You can also delete most of your own activity data directly within the App at any time.",
        ],
      },
      {
        heading: "10. How long we keep your data",
        body: [
          "We retain your data for as long as your account is active. If you request account deletion, we will delete or anonymize your personal data within 30 days, except where we are required to keep certain records by law.",
        ],
      },
      {
        heading: "11. Children's privacy",
        body: [
          "The App is not directed at children under 16, and we do not knowingly collect personal data from anyone under that age. If you believe a child has created an account, contact us and we will delete it.",
        ],
      },
      {
        heading: "12. Changes to this policy",
        body: [
          "We may update this Privacy Policy from time to time. We will update the date at the top of this page, and where a change is material, we will notify you inside the App.",
        ],
      },
      {
        heading: "13. Contact",
        body: [`Questions about this policy or your data: ${contactEmail}`],
      },
    ],
  }
}

export function getTerms(config: LegalConfig): LegalDocument {
  const { appName, operatorName, contactEmail, jurisdiction } = config

  return {
    title: "Terms & Conditions",
    lastUpdated: LAST_UPDATED_LABEL,
    intro: `These Terms & Conditions ("Terms") govern your use of ${appName} (the "App"), operated by ${operatorName}. By creating an account, you agree to these Terms.`,
    sections: [
      {
        heading: "1. The service",
        body: [
          `${appName} is a training-tracking application that lets you log sessions, track progress, earn achievements, and (where enabled) receive AI-assisted training and nutrition suggestions.`,
          "The App is a tracking and information tool. It is not a medical device, and any plans, suggestions, or AI-generated content are not a substitute for professional medical, fitness, or nutrition advice.",
        ],
      },
      {
        heading: "2. Health & fitness disclaimer",
        body: [
          "Consult a physician before beginning any new exercise or nutrition program, especially if you have any pre-existing condition, injury, or health concern.",
          "You use all training plans, drills, and AI-generated suggestions at your own risk. Training plans (including AI-generated ones) are not reviewed by a certified personal trainer or registered dietitian before being shown to you.",
          "Stop any activity that causes pain, dizziness, or discomfort, and seek medical attention if needed.",
        ],
      },
      {
        heading: "3. Eligibility",
        body: [
          "You must be at least 16 years old, or have the consent of a parent or legal guardian where required by your local law, to create an account.",
        ],
      },
      {
        heading: "4. Your account",
        body: [
          "You are responsible for the accuracy of the information you provide and for keeping your password secure.",
          "Accounts are for individual use — please don't share your login with others.",
        ],
      },
      {
        heading: "5. Subscriptions & payments",
        body: [
          `As of the date of this policy, ${appName} does not process any payments and is free to use. We plan to introduce optional paid subscriptions in the future.`,
          "Before any paid feature goes live, this section will be updated with the exact price, billing cycle, and cancellation process, and you will be shown those terms again before you pay anything.",
        ],
      },
      {
        heading: "6. Acceptable use",
        body: [
          "Don't attempt to reverse-engineer, disrupt, or gain unauthorized access to the App or its backend systems.",
          "Don't use the AI Coach feature to request or generate illegal, abusive, or harmful content.",
          "Don't misrepresent your identity or impersonate another person.",
        ],
      },
      {
        heading: "7. Your content",
        body: [
          "You retain ownership of the training data, notes, and messages you enter. By using the App, you grant us a limited license to store and process that content solely to provide the service to you.",
          `The ${appName} name, branding, and app design are owned by ${operatorName}.`,
        ],
      },
      {
        heading: "8. Termination",
        body: [
          "You may stop using the App and request account deletion at any time.",
          "We may suspend or terminate accounts that violate these Terms.",
        ],
      },
      {
        heading: "9. Disclaimer of warranties",
        body: [
          'The App is provided "as is" without warranties of any kind, to the fullest extent permitted by law.',
        ],
      },
      {
        heading: "10. Limitation of liability",
        body: [
          `To the fullest extent permitted by law, ${operatorName} is not liable for any indirect, incidental, or consequential damages arising from your use of the App, including any injury resulting from following a training or nutrition plan shown in the App.`,
        ],
      },
      {
        heading: "11. Governing law",
        body: [
          `These Terms are governed by the laws of ${jurisdiction}, without regard to conflict-of-law principles. If you live somewhere that grants you additional consumer-protection rights that can't be waived by this clause, those rights still apply to you.`,
        ],
      },
      {
        heading: "12. Changes to these terms",
        body: [
          "We may update these Terms from time to time. Continued use of the App after a change means you accept the updated Terms.",
        ],
      },
      {
        heading: "13. Contact",
        body: [`Questions about these Terms: ${contactEmail}`],
      },
    ],
  }
}

export function getCookiesPolicy(config: LegalConfig): LegalDocument {
  const { appName, contactEmail } = config

  return {
    title: "Cookies & Local Storage Policy",
    lastUpdated: LAST_UPDATED_LABEL,
    intro: `This page explains how ${appName} uses cookies, local storage, and similar technology.`,
    sections: [
      {
        heading: "1. We don't use tracking or advertising cookies",
        body: [
          `${appName} does not use advertising cookies, cross-site tracking pixels, or any third-party analytics as of the date of this policy.`,
        ],
      },
      {
        heading: "2. What we do use",
        body: [
          "On the web version, we store a session token in your browser's local storage so you stay signed in between visits. On the mobile app, the equivalent token is stored in your device's secure, app-private storage.",
          "This storage is strictly necessary to provide the login you asked for when you signed up — it isn't used for advertising or cross-site tracking, and under GDPR/ePrivacy rules, strictly-necessary storage like this does not require a cookie-consent banner.",
        ],
      },
      {
        heading: "3. If this changes",
        body: [
          "If we add analytics or advertising technology in the future, we will update this policy and show you a consent banner before activating anything that isn't strictly necessary.",
        ],
      },
      {
        heading: "4. Clearing local storage",
        body: [
          "On the web, you can clear your session by signing out, or by clearing your browser's site data for this domain. On mobile, signing out or uninstalling the app removes locally stored data.",
        ],
      },
      {
        heading: "5. Contact",
        body: [`Questions about this policy: ${contactEmail}`],
      },
    ],
  }
}

export function getRefundPolicy(config: LegalConfig): LegalDocument {
  const { appName, contactEmail } = config

  return {
    title: "Refund Policy",
    lastUpdated: LAST_UPDATED_LABEL,
    intro: `${appName} does not currently process any payments — this page is a placeholder describing our intended approach and will be replaced with final terms before any paid plan launches.`,
    sections: [
      {
        heading: "1. Current status",
        body: [
          `${appName} is free to use today. No purchases, subscriptions, or in-app payments are currently available, so there is nothing to refund.`,
        ],
      },
      {
        heading: "2. When paid plans launch",
        body: [
          "Before introducing any paid subscription, we will publish the exact price, billing cycle, cancellation process, and refund window here, and you will see those terms again before paying anything.",
          "As a general principle we intend to follow: you'll be able to cancel a subscription at any time from your account settings, effective at the end of the current billing period, and where local law grants you a statutory withdrawal or cooling-off right (for example, a 14-day right for digital purchases in the EU where the content hasn't yet been fully accessed), that right will be honored in addition to whatever we publish here.",
        ],
      },
      {
        heading: "3. Contact",
        body: [`Billing questions: ${contactEmail}`],
      },
    ],
  }
}
