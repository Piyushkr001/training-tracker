// app/actions/wardenActions.ts
'use server'

import { db } from '@/utils/db'
import { wardens } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getAllWardens() {
  return await db.select().from(wardens)
}

export async function addWarden({ name, role }: { name: string; role: string }) {
  await db.insert(wardens).values({ name, role })
  revalidatePath('/dashboard/wardens')
}

export async function deleteWarden(id: number) {
  await db.delete(wardens).where(eq(wardens.id, id))
  revalidatePath('/dashboard/wardens')
}
