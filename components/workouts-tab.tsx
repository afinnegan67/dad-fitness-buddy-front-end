"use client"

import { useContext } from "react"
import { PlanContext } from "@/context/plan-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionCard } from "./session-card"

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WorkoutsTab() {
  const { plan } = useContext(PlanContext)

  if (!plan?.weekly_split) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>No Workout Plan Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">
            Your workout plan hasn't been loaded correctly. Please try generating a new plan.
          </p>
        </CardContent>
      </Card>
    )
  }

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const todayWorkout = plan.weekly_split[todayName]

  // Sort the days of the week for the calendar view
  const sortedDays = Object.keys(plan.weekly_split).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))

  return (
    <div className="space-y-6">
      {todayWorkout ? (
        <SessionCard session={todayWorkout} day={todayName} />
      ) : (
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Rest Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">Enjoy your rest day! Recovery is key.</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Split</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {dayOrder.map((day) => (
              <div
                key={day}
                className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                  plan.weekly_split[day] ? "bg-slate-800" : "bg-slate-900/50 text-slate-600"
                } ${day === todayName ? "ring-2 ring-slate-500" : ""}`}
              >
                <span className="text-xs font-medium">{day.substring(0, 3)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
