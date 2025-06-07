'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type OverviewData = {
  upcomingCount: number
  pendingCount: number
  completionRate: number
  activities: string[]
}

export default function ClientOverview({ data }: { data: OverviewData }) {
  return (
    <div className="p-6 flex flex-col gap-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Overview</h1>

      {/* Stats Cards Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {[ 
          { title: 'Upcoming Trainings', value: `${data.upcomingCount} Sessions` },
          { title: 'Pending Approvals', value: `${data.pendingCount} Requests` },
          { title: 'Training Completion Rate', value: `${data.completionRate}%` }
        ].map((item, i) => (
          <Card key={i} className="flex-1 min-h-[130px] flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity & Notes Row */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 min-h-[180px] flex flex-col shadow-sm hover:shadow-md transition duration-300">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              {data.activities.map((log, i) => (
                <li key={i}>{log}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 min-h-[180px] flex flex-col shadow-sm hover:shadow-md transition duration-300">
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">Notes</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Remember to schedule the annual safety drill before the end of the month.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
