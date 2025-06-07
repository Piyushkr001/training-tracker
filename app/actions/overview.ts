'use server'

import { db } from '@/utils/db'
import { trainings, approvals, activityLogs } from '@/utils/schema'
import { eq, sql } from 'drizzle-orm'

export async function getOverviewData() {
  const upcomingTrainings = await db
    .select()
    .from(trainings)
    .where(sql`date > now()`)
    .limit(5)

  const pendingApprovals = await db
    .select()
    .from(approvals)
    .where(eq(approvals.status, 'pending'))

  // Removed the status check since it doesn't exist
  const completionStats = await db.select().from(trainings)
  const totalCompleted = completionStats.reduce((acc, t) => acc + (t.completed || 0), 0)
  const totalPossible = completionStats.reduce((acc, t) => acc + (t.total || 0), 0)
  const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0

  const activities = await db
    .select()
    .from(activityLogs)
    .orderBy(activityLogs.createdAt)
    .limit(5)

  return {
    upcomingCount: upcomingTrainings.length,
    pendingCount: pendingApprovals.length,
    completionRate,
    activities: activities.map((a) => a.message),
  }
}