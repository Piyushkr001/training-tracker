'use server'


import { db } from '@/utils/db'
import { resources } from '@/utils/schema'
import { put, del } from '@vercel/blob'
import { eq } from 'drizzle-orm'

const token = process.env.BLOB_READ_WRITE_TOKEN

export async function uploadResource(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) return null

  const blob = await put(`drilldesk/${Date.now()}-${file.name}`, file, {
    access: 'public',
    token,
  })

  const [saved] = await db
    .insert(resources)
    .values({
      name: file.name,
      url: blob.url,
      createdAt: new Date(),
    })
    .returning()

  return saved
}

export async function deleteResource(id: string) {
  const [res] = await db.delete(resources).where(eq(resources.id, id)).returning()

  if (res?.url) {
    const url = new URL(res.url)
    await del(url.pathname.slice(1), { token })
  }

  return res
}
