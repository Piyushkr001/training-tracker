'use client'

import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AboutQueryComponent from './component/AboutQueryComponent'


export default function AboutPage() {
  return (
    <section className="min-h-screen px-4 md:px-10 py-8 flex flex-col gap-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">About KGBV Training Tracker</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          KGBV Training is a powerful platform designed to streamline and manage emergency training and drill sessions 
          for wardens and safety officers. Our goal is to create a more responsive, better-prepared safety workforce 
          through smart, automated systems.
        </p>
        <Badge variant="outline" className="mt-4">Empowering Emergency Readiness</Badge>
      </div>

      {/* Mission + Vision */}
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-6xl mx-auto">
        <Card className="flex-1 min-w-[280px]">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              To equip organizations with the tools they need to efficiently manage emergency training, 
              reduce drill fatigue, and ensure every responder is ready to act under pressure.
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[280px]">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              To be the go-to platform for emergency preparedness across industries, 
              ensuring no team is ever underprepared during a crisis.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-500">Our Core Values</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Safety First', 'Simplicity', 'Accountability', 'Speed & Precision', 'Continuous Learning'].map((value, index) => (
            <Badge key={index} variant="secondary" className="text-sm px-4 py-2 rounded-xl">
              {value}
            </Badge>
          ))}
        </div>
      </div>

      {/* Optional Client Component That Uses useSearchParams */}
      <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
        <AboutQueryComponent />
      </Suspense>
    </section>
  )
}
