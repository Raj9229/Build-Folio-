import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { APP_CONFIG } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} - ${APP_CONFIG.description}`,
  description: APP_CONFIG.description,
  keywords: ["resume builder", "portfolio builder", "CV maker", "professional resume", "job application"],
  authors: [{ name: APP_CONFIG.author }],
  creator: APP_CONFIG.author,
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
