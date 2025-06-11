'use client'

import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Real-Time Drill Monitoring',
    description: 'Track training sessions live with attendance, completion status, and alerts for missing participants.',
  },
  {
    title: 'Certification Management',
    description: 'Easily issue, revoke, or verify training certificates with QR-based authentication.',
  },
  {
    title: 'Custom Training Programs',
    description: 'Design your own drill schedules and assign them to different warden groups or departments.',
  },
  {
    title: 'Interactive Dashboards',
    description: 'View completion rates, upcoming trainings, and response metrics in a visually rich dashboard.',
  },
  {
    title: 'Mobile Access',
    description: 'Trainers and wardens can access schedules, checklists, and feedback forms from any device.',
  },
  {
    title: 'Automated Reminders',
    description: 'Send timely email and SMS alerts for upcoming training, certification expiry, and drill rehearsals.',
  },
  {
    title: 'Feedback & Evaluation',
    description: 'Collect post-training feedback and auto-generate evaluation reports for trainers and trainees.',
  },
  {
    title: 'Role-Based Access Control',
    description: 'Admins, Trainers, and Wardens get different views and permissions based on their role.',
  },
]

export default function FeaturesPage() {
  return (
    <section className="min-h-screen p-4 md:p-8 flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Key Features
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
          Explore the core features of the KGBV Training platform.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="w-full sm:w-[45%] lg:w-[30%] flex flex-col justify-between shadow-sm border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <CardTitle className="text-base">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
