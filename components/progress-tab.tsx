"use client"

import { useContext, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PlanContext } from "@/context/plan-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ProgressTab() {
  const { plan } = useContext(PlanContext)

  const totalWorkouts = useMemo(() => {
    if (!plan?.weekly_split) return 0
    return Object.keys(plan.weekly_split).length
  }, [plan])

  const chartData = useMemo(() => {
    if (!plan?.weekly_split) return []
    return Object.entries(plan.weekly_split).map(([day, workout]) => ({
      day: day.substring(0, 3),
      exercises: workout.exercises.length,
    }))
  }, [plan])

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-slate-800 text-center">
        <CardHeader>
          <CardTitle className="text-base">Workouts This Week</CardTitle>
          <CardDescription>Total planned sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold">{totalWorkouts}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Exercises per Session</CardTitle>
          <CardDescription>A look at the volume for each workout day.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }}
              />
              <Bar dataKey="exercises" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Note on Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">
            To track workout completion and streaks, we'll need to add a feature to mark sessions as "complete". This
            can be added in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
