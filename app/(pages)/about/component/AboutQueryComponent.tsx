'use client'

import { useSearchParams } from 'next/navigation'

export default function AboutQueryComponent() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Guest'

  return (
    <div className="text-center text-sm text-gray-500 mt-6">
      Hello, {name}! Welcome to the KGBV Training Tracker.
    </div>
  )
}
