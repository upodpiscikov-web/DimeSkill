import React from "react"
import { Text, View } from "react-native"
import { useTheme } from "../ThemeProvider"
import { ScreenContainer } from "./ScreenContainer"
import type { LegalDocument } from "@athlete/legal"

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  const theme = useTheme()

  return (
    <ScreenContainer>
      <Text
        accessibilityRole="header"
        style={{ color: theme.text, fontSize: theme.fontSize.xxl, fontWeight: "700" }}
      >
        {document.title}
      </Text>
      <Text style={{ color: theme.textMuted, fontSize: theme.fontSize.sm }}>
        Last updated: {document.lastUpdated}
      </Text>
      {document.intro && (
        <Text style={{ color: theme.text, fontSize: theme.fontSize.md, lineHeight: 22 }}>
          {document.intro}
        </Text>
      )}
      <View style={{ gap: theme.spacing(2.5) }}>
        {document.sections.map((section) => (
          <View key={section.heading} style={{ gap: theme.spacing(1) }}>
            <Text
              accessibilityRole="header"
              style={{ color: theme.text, fontSize: theme.fontSize.lg, fontWeight: "700" }}
            >
              {section.heading}
            </Text>
            {section.body.map((paragraph, index) => (
              <Text
                key={index}
                style={{ color: theme.textMuted, fontSize: theme.fontSize.md, lineHeight: 22 }}
              >
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScreenContainer>
  )
}
