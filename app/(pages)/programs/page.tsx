'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { WarpBackground } from '@/components/magicui/warp-background'


const programs = [
  {
    id: 1,
    title: 'Fire Safety Training',
    description: 'Learn to handle fire emergencies with confidence.',
    details: {
      fullDescription: 'This program includes fire extinguisher handling, emergency response tactics, and simulated scenarios.',
      duration: '3 Days',
      audience: 'All wardens and facility managers',
      outcomes: [
        'Operate various fire extinguishers',
        'Identify fire hazards and suppression methods',
        'Execute evacuation under smoke conditions'
      ],
      instructor: 'Captain Rakesh Sharma',
      certification: 'Yes – Government Recognized'
    }
  },
  {
    id: 2,
    title: 'Evacuation Drill',
    description: 'Master the art of safe and quick evacuations.',
    details: {
      fullDescription: 'Participants will learn building evacuation strategies, assembly point management, and drill coordination.',
      duration: '1 Day',
      audience: 'Security and Safety Coordinators',
      outcomes: [
        'Design evacuation plans',
        'Lead and manage emergency drills',
        'Communicate effectively during evacuations'
      ],
      instructor: 'Ms. Anjali Mehta',
      certification: 'Certificate of Participation'
    }
  },
  {
    id: 3,
    title: 'First Aid Basics',
    description: 'Basic life-saving skills for emergencies.',
    details: {
      fullDescription: 'Covers CPR, bleeding control, wound care, and emergency scene assessment.',
      duration: '2 Days',
      audience: 'All staff and warden personnel',
      outcomes: [
        'Perform CPR and mouth-to-mouth resuscitation',
        'Apply bandages and stop bleeding',
        'Stabilize a victim until help arrives'
      ],
      instructor: 'Dr. Rajiv Sen',
      certification: 'Red Cross Certified'
    }
  },
  {
    id: 4,
    title: 'Disaster Management',
    description: 'Plan and act effectively during disasters.',
    details: {
      fullDescription: 'Focuses on disaster preparedness, response frameworks, and inter-agency coordination.',
      duration: '4 Days',
      audience: 'Wardens and Disaster Response Teams',
      outcomes: [
        'Create disaster management protocols',
        'Coordinate with emergency services',
        'Lead response during natural disasters'
      ],
      instructor: 'Col. Manjeet Thakur',
      certification: 'Yes – NDMA Certified'
    }
  },
]

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<null | (typeof programs)[0]>(null)

  return (
    <WarpBackground>
      <section className="min-h-screen p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          Training Programs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {programs.map((program) => (
            <Card key={program.id} className="flex flex-col justify-between h-full">
              <CardHeader>
                <CardTitle>{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                <p className="text-gray-600 dark:text-gray-300">{program.description}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedProgram(program)}>View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{selectedProgram?.title}</DialogTitle>
                    </DialogHeader>

                    {/* Fix: use asChild with DialogDescription and wrap everything in a div */}
                    <DialogDescription asChild>
                      <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>{selectedProgram?.details.fullDescription}</p>

                        <div>
                          <strong>Details:</strong>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li><strong>Duration:</strong> {selectedProgram?.details.duration}</li>
                            <li><strong>Audience:</strong> {selectedProgram?.details.audience}</li>
                            <li><strong>Instructor:</strong> {selectedProgram?.details.instructor}</li>
                            <li><strong>Certification:</strong> {selectedProgram?.details.certification}</li>
                          </ul>
                        </div>

                        <div>
                          <strong>Key Outcomes:</strong>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            {selectedProgram?.details.outcomes.map((outcome, idx) => (
                              <li key={idx}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </WarpBackground>
  )
}

