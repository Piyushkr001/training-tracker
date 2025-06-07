// lib/actions/user.ts
'use server'

import { db } from '@/utils/db'
import { users } from '@/utils/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function upsertClerkUser() {
  const authResult = await auth(); // Await the promise to get the Auth object
  const { userId } = authResult; // Now you can destructure userId

  if (!userId) return null;

  const userData = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
    },
  }).then((res) => res.json());

  const existing = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (existing) return existing;

  const inserted = await db
    .insert(users)
    .values({
      clerkId: userId,
      email: userData.email_addresses?.[0]?.email_address || '',
      name: userData.first_name + ' ' + userData.last_name,
      picture: userData.image_url,
    })
    .returning();

  return inserted[0];
}