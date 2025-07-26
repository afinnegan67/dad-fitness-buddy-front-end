"use client"

import { useContext } from "react"
import { PlanContext } from "@/context/plan-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function DietTab() {
  const { plan } = useContext(PlanContext)

  if (!plan?.meals || plan.meals.length === 0) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle>No Diet Plan Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">
            Your diet plan hasn't been loaded correctly. Please try generating a new plan.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {plan.meals.map((meal) => (
        <Card key={meal.meal_number} className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>
              Meal {meal.meal_number}: {meal.meal_name}
            </CardTitle>
            <CardDescription>
              {meal.calories} kcal &bull; P {meal.macros.protein}g | C {meal.macros.carbs}g | F {meal.macros.fat}g
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Ingredients</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <Separator className="bg-slate-800" />
            <div>
              <h4 className="font-semibold mb-2">Instructions</h4>
              <p className="text-slate-300 whitespace-pre-wrap">{meal.instructions}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
