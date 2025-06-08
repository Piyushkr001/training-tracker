'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { sendContactMessage } from '@/app/actions/contact'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const res = await sendContactMessage(formData)
      if (res.success) {
        toast.success('✅ Message sent successfully.')
      } else {
        toast.error('❌ Failed to send message. Please try again.')
      }
    })
  }

  return (
    <section className="min-h-screen px-4 md:px-10 py-8 flex flex-col gap-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">Contact Us</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm md:text-base">
          Have a question, suggestion, or need support? We’d love to hear from you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Contact Info */}
        <Card className="flex-1 min-w-[280px]">
          <CardHeader>
            <CardTitle>Our Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>Email:</strong>
              <p>support@drilldesk.io</p>
            </div>
            <div>
              <strong>Phone:</strong>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <strong>Office Address:</strong>
              <p>
                Drill Desk HQ<br />
                123 Safety Lane<br />
                New Delhi, India
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="flex-1 min-w-[280px]">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={handleSubmit} className="flex flex-col gap-4">
              <Input name="name" type="text" placeholder="Your Name" required />
              <Input name="email" type="email" placeholder="Your Email" required />
              <Textarea name="message" placeholder="Your Message" rows={5} required />
              <Button type="submit" disabled={isPending} className="self-start">
                {isPending ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
