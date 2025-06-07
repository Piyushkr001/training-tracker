'use server'

import { db } from '@/utils/db'
import { attendance } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export interface Attendance {
  id: number
  name: string
  date: string // in YYYY-MM-DD
  status: 'Present' | 'Absent'
  role: string
}

// Helper to format date into YYYY-MM-DD
function formatDate(input: string | Date): string {
  const date = new Date(input)
  return date.toISOString().split('T')[0]
}

// Get all attendance records
export async function getAllAttendance(): Promise<Attendance[]> {
  const records = await db.select().from(attendance)
  return records.map((record) => ({
    ...record,
    date: formatDate(record.date),
  }))
}

// Add a new attendance entry
export async function addAttendance(data: {
  name: string
  date: string
  status: 'Present' | 'Absent'
  role: string
}): Promise<Attendance> {
  const [created] = await db
    .insert(attendance)
    .values({
      ...data,
      date: formatDate(data.date),
    })
    .returning()

  revalidatePath('/dashboard/attendance')

  return {
    ...created,
    date: formatDate(created.date),
  }
}

// Delete an attendance record by ID
export async function deleteAttendance(id: number) {
  await db.delete(attendance).where(eq(attendance.id, id))
  revalidatePath('/dashboard/attendance')
}
