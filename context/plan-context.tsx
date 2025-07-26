"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Plan } from "@/lib/types"

interface PlanContextType {
  plan: Plan | null
  setPlan: (plan: Plan | null) => void
  updatePlan: (plan: Plan) => void
  loading: boolean
}

export const PlanContext = createContext<PlanContextType>({
  plan: null,
  setPlan: () => {},
  updatePlan: () => {},
  loading: true,
})

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitnessPlan")
      if (storedPlan) {
        setPlanState(JSON.parse(storedPlan))
      }
    } catch (error) {
      console.error("Failed to parse plan from localStorage", error)
      localStorage.removeItem("fitnessPlan")
    } finally {
      setLoading(false)
    }
  }, [])

  const setPlan = (newPlan: Plan | null) => {
    setPlanState(newPlan)
    if (newPlan) {
      localStorage.setItem("fitnessPlan", JSON.stringify(newPlan))
    } else {
      localStorage.removeItem("fitnessPlan")
    }
  }

  const updatePlan = (updatedPlan: Plan) => {
    setPlan(updatedPlan)
  }

  return <PlanContext.Provider value={{ plan, setPlan, updatePlan, loading }}>{children}</PlanContext.Provider>
}
