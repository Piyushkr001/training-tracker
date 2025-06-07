import { getTrainings } from '@/app/actions/training'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { upsertClerkUser } from '../actions/user'

interface Training {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  duration: string | null;
  audience: string | null;
  outcomes: string | null;
  instructor: string | null;
  certification: string | null;
  date: string;
}

export default async function DashboardPage() {
  const user = await currentUser()
  await upsertClerkUser()
  const rawTrainings = await getTrainings()

  const trainingsWithDate: Training[] = rawTrainings.map(training => ({
    ...training,
    date: training.duration || new Date().toISOString() // fallback
  }))

  return (
    <section className="p-6 flex flex-col gap-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Welcome */}
      <div className="flex flex-col gap-1 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back, <span className="text-primary">{user?.firstName}</span>!
        </h1>
        <p className="text-muted-foreground text-sm">Here’s your training overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1 shadow-sm dark:shadow-md border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Total Trainings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{trainingsWithDate.length}</p>
          </CardContent>
        </Card>

        <Card className="flex-1 shadow-sm dark:shadow-md border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upcoming Trainings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {
                trainingsWithDate.filter((t) => new Date(t.date) > new Date()).length
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trainings */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Trainings</h2>
          <Link href="/dashboard/trainings">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {trainingsWithDate.length === 0 ? (
          <p className="text-sm text-muted-foreground">No trainings available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingsWithDate.slice(0, 3).map((training) => (
              <Card key={training.id} className="hover:shadow-lg transition-shadow border border-border bg-card dark:bg-muted">
                <CardContent className="p-4 space-y-1">
                  <h3 className="font-semibold text-lg text-foreground">{training.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(training.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{training.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-8">
        <Link href="/dashboard/trainings">
          <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white dark:text-white">
            Add New Training
          </Button>
        </Link>
      </div>
    </section>
  )
}
