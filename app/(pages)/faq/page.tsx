'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { WarpBackground } from '@/components/magicui/warp-background'

const faqs = [
  {
    question: 'What is the purpose of the training program?',
    answer: 'The training programs prepare wardens and emergency personnel to handle fire, evacuation, and disaster scenarios confidently.',
  },
  {
    question: 'Who can enroll in these training programs?',
    answer: 'Programs are aimed at wardens, facility managers, and safety coordinators. Some are open to all staff for awareness.',
  },
  {
    question: 'Do the participants receive certificates?',
    answer: 'Yes. Most programs issue certificates that are either government-recognized or institutionally validated.',
  },
  {
    question: 'Where are the trainings conducted?',
    answer: 'Trainings are held at NDRF HQ, Rajasthan Disaster Centre, or can be organized on-site at your institution.',
  },
  {
    question: 'How can I register?',
    answer: 'Registration is typically done through your organization’s HR/safety team, or you may contact our coordinators directly.',
  },
  {
    question: 'Are there any fees for participation?',
    answer: 'Some programs are subsidized or free for public institutions. Others may charge a nominal fee to cover materials and logistics.',
  },
  {
    question: 'What is the duration of each program?',
    answer: 'Programs vary: First Aid is 2 days, Fire Safety is 3 days, Disaster Management is 4 days. Full details are on the Programs page.',
  },
  {
    question: 'Is there any dress code or material to bring?',
    answer: 'Participants should wear comfortable clothing and bring a notepad. All safety gear will be provided on-site.',
  },
  {
    question: 'Can the training be conducted at our institution?',
    answer: 'Yes, we offer on-site training on request. Contact the training coordinator at least 2 weeks in advance to schedule.',
  },
  {
    question: 'Is there a refresher course available?',
    answer: 'Yes. Annual refresher courses are recommended and available for most programs to maintain readiness and certification validity.',
  },
]

export default function FaqsPage() {
  const [query, setQuery] = useState('')

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(query.toLowerCase()) ||
    faq.answer.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <WarpBackground>
    <section className="min-h-screen p-4 md:p-8 flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Find answers to your questions about our training programs.
        </p>
      </div>

      <div className="max-w-2xl w-full mx-auto">
        <Input
          placeholder="Search FAQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-6"
        />

        <Accordion type="single" collapsible className="space-y-2">
          {filteredFaqs.length ? (
            filteredFaqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No matching FAQs found.</p>
          )}
        </Accordion>
      </div>
    </section>
    </WarpBackground>
  )
}
