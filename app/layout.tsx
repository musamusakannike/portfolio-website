import type React from "react"
import type { Metadata } from "next"
import { Poppins, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "codiac - Fullstack Developer Portfolio",
  description:
    "Portfolio of Musa Musa Kannike (codiac) - Fullstack Web & Mobile Developer specializing in React, React Native, Next.js, Node.js, and MongoDB.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  )
}
