"use client"

import { useContext, useState } from "react"
import { PlanContext } from "@/context/plan-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionCard } from "./session-card"
import { Button } from "@/components/ui/button"

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WorkoutsTab() {
  const { plan } = useContext(PlanContext)
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const [selectedDay, setSelectedDay] = useState(todayName)

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

  const selectedWorkout = plan.weekly_split[selectedDay]

  return (
    <div className="space-y-6">
      {selectedWorkout ? (
        <SessionCard session={selectedWorkout} day={selectedDay} />
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
            {dayOrder.map((day) => {
              const isWorkoutDay = !!plan.weekly_split[day]
              const isToday = day === todayName
              const isSelected = day === selectedDay

              return (
                <Button
                  key={day}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                  className={`h-auto flex-col items-center justify-center p-2 rounded-lg transition-colors
                    ${isWorkoutDay ? "hover:bg-slate-700" : "cursor-default text-slate-600 hover:bg-transparent"}
                    ${isSelected ? "bg-slate-700" : isWorkoutDay ? "bg-slate-800" : "bg-slate-900/50"}
                    ${isToday ? "ring-2 ring-slate-500" : ""}
                  `}
                >
                  <span className="text-xs font-medium">{day.substring(0, 3)}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
