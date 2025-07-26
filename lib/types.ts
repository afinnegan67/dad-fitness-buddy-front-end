export interface OnboardingData {
  weight: number
  height: number
  age: number
  goal: "Gain muscle" | "Lose fat" | "General health"
  days: "3" | "4" | "5" | "6"
  limitations?: string
  dietStyle: "Omnivore" | "Pescatarian" | "Vegetarian" | "Other"
  dislikes?: string
}

export interface Plan {
  meals: Array<{
    meal_number: number
    meal_name: string
    calories: number
    macros: { protein: number; carbs: number; fat: number }
    ingredients: string[]
    instructions: string
  }>
  weekly_split: Record<
    string,
    {
      focus: string
      exercises: { name: string; sets_reps: string; notes: string }[]
    }
  >
}
