'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <section className="min-h-screen px-4 md:px-10 py-10 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
          Privacy Policy
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Introduction</CardTitle>
          </CardHeader>
          <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Drill Desk is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              and safeguard your personal information when you use our platform.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal identification (e.g., name, email, phone number)</li>
                <li>Usage data and technical information (IP, browser type, device)</li>
                <li>Training activity records and feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">2. How We Use Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and manage training programs</li>
                <li>To improve our services and user experience</li>
                <li>To communicate with users and provide support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">3. Data Sharing and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-1">
                <li>We do not sell or trade user data</li>
                <li>Data is stored securely using modern encryption methods</li>
                <li>Third-party service providers are bound by confidentiality</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">4. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and update your information</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">5. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <strong>privacy@drilldesk.io</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
