'use server'

import { db } from '@/utils/db'
import { trainingPrograms } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getTrainings() {
  const trainings = await db.select().from(trainingPrograms)
  return trainings
}

export async function deleteTraining(id: number) {
  await db.delete(trainingPrograms).where(eq(trainingPrograms.id, id))
  revalidatePath('/training') // optional, if client fetch relies on SSR
}

export async function addTraining({
  title,
  description,
  // Removed date since it's not in the schema
}: {
  title: string
  description: string
  // Removed date from the parameter type
}) {
  await db.insert(trainingPrograms).values({
    title,
    fullDescription: description,
    description,
    // Removed date from the values being inserted
    duration: '',
    audience: '',
    outcomes: '',
    instructor: '',
    certification: '',
  })
  revalidatePath('/training')
}