'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white to-blue-200 dark:from-gray-900 dark:to-gray-800 py-16 md:py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Empower Wardens with <br />
            <span className="text-blue-600 dark:text-blue-400">Efficient Training Tracking</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            Drill Desk helps institutions manage, track, and analyze warden training activities with ease and precision.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/learn-more">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/images/Hero.png"
              alt="Training illustration"
              width={600}
              height={400}
              className="w-full rounded-2xl border-transparent object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
