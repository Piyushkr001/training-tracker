'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { WarpBackground } from '@/components/magicui/warp-background'

const trainingCenters = [
  {
    id: 'rdmc',
    name: 'Rajasthan Disaster Management Centre',
    address: 'Jaipur, Rajasthan, India',
    contact: '+91 98765 43210',
    programs: ['Fire Safety Training', 'Evacuation Drill', 'Disaster Management'],
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5194249328123!2d75.78730297542668!3d26.791360665913667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4165a00765f%3A0xbb7a52e3f983e9ba!2sRajasthan%20Disaster%20Management%20Centre!5e0!3m2!1sen!2sin!4v1716458199000!5m2!1sen!2sin',
  },
  {
    id: 'ndrf',
    name: 'National Disaster Response Force HQ',
    address: 'New Delhi, India',
    contact: '+91 99887 77665',
    programs: ['First Aid Basics', 'Rescue Operations', 'Earthquake Preparedness'],
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.751481902536!2d77.10668987555438!3d28.66878307565574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0278b9b1b26b%3A0xdffdf8cb1c4d1e2f!2sNational%20Disaster%20Response%20Force!5e0!3m2!1sen!2sin!4v1716458907646!5m2!1sen!2sin',
  },
]

export default function TrainingMapPage() {
  const [selectedCenter, setSelectedCenter] = useState(trainingCenters[0])
  const mapRef = useRef<HTMLDivElement>(null)

  const handleChange = (value: string) => {
    const center = trainingCenters.find((c) => c.id === value)
    if (center) {
      setSelectedCenter(center)
      // Scroll to map
      setTimeout(() => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <WarpBackground>
    <section className="min-h-screen p-4 md:p-8 flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
        Training Location Map
      </h1>

      <div className="max-w-md mx-auto w-full">
        <Label className='mb-3'>Select Training Center</Label>
        <Select onValueChange={handleChange} defaultValue={selectedCenter.id}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a center" />
          </SelectTrigger>
          <SelectContent>
            {trainingCenters.map((center) => (
              <SelectItem key={center.id} value={center.id}>
                {center.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6" ref={mapRef}>
        {/* Map */}
        <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden shadow-md">
          <iframe
            src={selectedCenter.mapUrl}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="h-[300px] lg:h-full w-full border-none"
          />
        </div>

        {/* Details */}
        <Card className="flex-1 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{selectedCenter.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div><strong>Address:</strong> {selectedCenter.address}</div>
            <div><strong>Contact:</strong> {selectedCenter.contact}</div>
            <Separator />
            <div>
              <strong>Active Programs:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {selectedCenter.programs.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    </WarpBackground>
  )
}
