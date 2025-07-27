import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AGORA - Restaurant, Bar, Karaoke, PlayStation & Hookah",
  description:
    "Experience the ultimate entertainment destination with restaurant, bar, karaoke, PlayStation gaming and hookah lounge all in one place",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
