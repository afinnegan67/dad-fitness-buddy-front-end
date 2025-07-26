import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PlanProvider } from "@/context/plan-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dad's Fitness Dashboard",
  description: "Personalized fitness and diet tracking, simplified.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <PlanProvider>
          <main className="min-h-screen bg-slate-950 text-slate-50">
            <div className="mx-auto max-w-md p-4">{children}</div>
          </main>
        </PlanProvider>
        <Toaster />
      </body>
    </html>
  )
}
