import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "JE Soccer - Live Scores, Stats & Predictions",
  description: "The ultimate soccer platform. Live scores, player stats, match predictions, fantasy football, transfers, and more.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen bg-je-darker">
          {children}
        </main>
      </body>
    </html>
  )
}
