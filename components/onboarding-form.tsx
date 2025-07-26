"use client"

import { useTransition, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { generatePlan } from "@/app/actions"
import { PlanContext } from "@/context/plan-context"
import type { OnboardingData } from "@/lib/types"

const formSchema = z.object({
  weight: z.coerce.number().min(1, "Weight is required"),
  height: z.coerce.number().min(1, "Height is required"),
  age: z.coerce.number().min(1, "Age is required"),
  goal: z.enum(["Gain muscle", "Lose fat", "General health"]),
  days: z.enum(["3", "4", "5", "6"]),
  limitations: z.string().optional(),
  dietStyle: z.enum(["Omnivore", "Pescatarian", "Vegetarian", "Other"]),
  dislikes: z.string().optional(),
})

export function OnboardingForm() {
  const [isPending, startTransition] = useTransition()
  const { setPlan } = useContext(PlanContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 180,
      height: 70,
      age: 45,
      goal: "Lose fat",
      days: "4",
      dietStyle: "Omnivore",
      limitations: "",
      dislikes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { plan, error } = await generatePlan(values as OnboardingData)
      if (error) {
        toast.error(error)
      } else if (plan) {
        toast.success("Your plan has been generated!")
        setPlan(plan)
      }
    })
  }

  if (isPending) {
    return (
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>Generating Your Plan</CardTitle>
          <CardDescription>Please wait while we create your personalized fitness and diet program.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
          <p className="text-slate-400">This may take a moment...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>Fitness & Diet Intake</CardTitle>
        <CardDescription>Tell us about yourself to generate a personalized plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (in)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Gain muscle">Gain muscle</SelectItem>
                        <SelectItem value="Lose fat">Lose fat</SelectItem>
                        <SelectItem value="General health">General health</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gym Days/Week</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="4">4 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="6">6 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="dietStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Omnivore">Omnivore</SelectItem>
                      <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limitations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Injuries or Limitations (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., bad knees, shoulder impingement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dislikes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Dislikes (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., mushrooms, cilantro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generate My Plan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
