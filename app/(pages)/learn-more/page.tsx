'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs' // Clerk hook
import { WarpBackground } from '@/components/magicui/warp-background'

export default function LearnMorePage() {
  const { isSignedIn } = useUser()

  return (
    <WarpBackground>
    <section className="min-h-screen px-4 md:px-10 py-10 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col gap-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400">
          Learn More About KGBV Training Tracker
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">What is KGBV Training Tracker?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              KGBV Training Tracker is a comprehensive platform designed to help safety wardens and emergency personnel plan,
              track, and analyze their training and response readiness.
            </p>
            <p>
              Our mission is to simplify compliance, enhance preparedness, and improve communication during safety
              drills and real-life incidents.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Why Choose KGBV Training?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-3">
              <ul className="list-disc pl-6 space-y-2">
                <li>User-friendly interface for quick adoption</li>
                <li>Centralized dashboard for all training activities</li>
                <li>Real-time reporting and analytics</li>
                <li>Fully customizable training workflows</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Who is it for?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-3">
              <ul className="list-disc pl-6 space-y-2">
                <li>Safety Wardens</li>
                <li>Facility Managers</li>
                <li>Emergency Coordinators</li>
                <li>Training Officers</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Ready to streamline your training and safety procedures? Get started with Drill Desk today and take control
              of your emergency preparedness.
            </p>
            <div className="flex justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-rose-500 hover:bg-rose-700"
                  disabled={isSignedIn}
                >
                  {isSignedIn ? 'Already Signed In' : 'Sign Up Now'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    </WarpBackground>
  )
}
