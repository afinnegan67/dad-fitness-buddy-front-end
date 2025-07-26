"use client"

import { useContext } from "react"
import { OnboardingForm } from "@/components/onboarding-form"
import { Dashboard } from "@/components/dashboard"
import { PlanContext } from "@/context/plan-context"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { plan, loading } = useContext(PlanContext)

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  return plan ? <Dashboard /> : <OnboardingForm />
}
