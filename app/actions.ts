"use server"
import type { Plan, OnboardingData } from "@/lib/types"
import { N8N_WEBHOOK_URL } from "@/lib/constants"

export async function generatePlan(data: OnboardingData): Promise<{ plan: Plan | null; error: string | null }> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Webhook Error:", errorText)
      throw new Error(`The plan generation failed. The server responded with: ${response.statusText}`)
    }

    const payload = await response.json()

    // Normalize two possible shapes from the webhook:
    // 1) An array of outputs: [{ output: { meals }}, { output: { weekly_split }}]
    // 2) A single flat object: { meals, weekly_split }
    let meals, weekly_split

    if (Array.isArray(payload)) {
      const mealNode = payload.find((n) => n.output?.meals)
      const workoutNode = payload.find((n) => n.output?.weekly_split)
      meals = mealNode?.output?.meals
      weekly_split = workoutNode?.output?.weekly_split
    } else {
      meals = payload.meals
      weekly_split = payload.weekly_split
    }

    if (!meals || !weekly_split) {
      console.error("Unexpected webhook payload:", JSON.stringify(payload, null, 2))
      throw new Error("Webhook response has an unexpected format. Check server logs for details.")
    }

    const plan = { meals, weekly_split }
    return { plan, error: null }
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return { plan: null, error: errorMessage }
  }
}
