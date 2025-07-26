"use client"

import { useContext, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlanContext } from "@/context/plan-context"

const MOCK_COMPLETION_DATA = [
  { name: "Week 1", completions: 3 },
  { name: "Week 2", completions: 2 },
  { name: "Week 3", completions: 4 },
  { name: "Week 4", completions: 3 },
]

export function ProgressTab() {
  const { plan } = useContext(PlanContext)

  const weeklyProgress = useMemo(() => {
    if (!plan?.workout?.weeklySchedule) return { completed: 0, total: 0 }
    const workoutDays = plan.workout.weeklySchedule.filter((d) => d.focus !== "Rest" && d.focus !== "Active Recovery")
    const completed = workoutDays.filter((d) => d.completed).length
    return { completed, total: workoutDays.length }
  }, [plan])

  const currentStreak = useMemo(() => {
    if (!plan?.workout?.weeklySchedule) return 0
    let streak = 0
    let continueCounting = true
    // Create a copy to avoid mutating the original plan data
    const schedule = [...plan.workout.weeklySchedule].reverse()
    for (const day of schedule) {
      if (day.focus !== "Rest" && day.focus !== "Active Recovery") {
        if (day.completed && continueCounting) {
          streak++
        } else if (!day.completed) {
          // Stop counting once we hit an incomplete workout day
          continueCounting = false
        }
      }
    }
    return streak
  }, [plan])

  const barData = [{ name: "This Week", completed: weeklyProgress.completed, total: weeklyProgress.total }]

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-center py-8">
            Progress tracking features are being updated for the new plan structure and will be available soon.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for future updates */}
    </div>
  )
}
