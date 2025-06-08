'use server'

import { db } from "@/utils/db"
import { contactMessages } from "@/utils/schema"



export async function sendContactMessage(formData: FormData): Promise<{ success: boolean }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false }
  }

  try {
    await db.insert(contactMessages).values({
      name,
      email,
      message,
    })

    return { success: true }
  } catch (err) {
    console.error('Failed to save contact message:', err)
    return { success: false }
  }
}
