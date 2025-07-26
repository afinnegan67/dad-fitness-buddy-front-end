import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface SessionCardProps {
  session: {
    focus: string
    exercises: { name: string; sets_reps: string; notes: string }[]
  }
  day: string
}

export function SessionCard({ session, day }: SessionCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle>
          {day}: {session.focus}
        </CardTitle>
        <CardDescription>Today's workout session. Let's get it done.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {session.exercises.map((ex, index) => (
          <div key={ex.name}>
            <div className="grid grid-cols-3 items-start gap-4">
              <p className="font-semibold col-span-2">{ex.name}</p>
              <p className="text-slate-400 text-right">{ex.sets_reps}</p>
            </div>
            {ex.notes && <p className="text-sm text-slate-400 mt-1 pl-2 border-l-2 border-slate-700">{ex.notes}</p>}
            {index < session.exercises.length - 1 && <Separator className="mt-4 bg-slate-800" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
