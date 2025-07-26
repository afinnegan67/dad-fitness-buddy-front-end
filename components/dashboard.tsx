"use client"

import { useContext } from "react"
import { PlanContext } from "@/context/plan-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkoutsTab } from "@/components/workouts-tab"
import { ProgressTab } from "@/components/progress-tab"
import { DietTab } from "@/components/diet-tab"

export function Dashboard() {
  const { setPlan } = useContext(PlanContext)

  const handleStartOver = () => {
    if (window.confirm("Are you sure? This will clear your current plan and return to the intake form.")) {
      setPlan(null)
    }
  }

  return (
    <>
      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="diet">Diet</TabsTrigger>
        </TabsList>
        <TabsContent value="workouts" className="mt-4">
          <WorkoutsTab />
        </TabsContent>
        <TabsContent value="progress" className="mt-4">
          <ProgressTab />
        </TabsContent>
        <TabsContent value="diet" className="mt-4">
          <DietTab />
        </TabsContent>
      </Tabs>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={handleStartOver}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          New Plan
        </Button>
      </div>
    </>
  )
}
