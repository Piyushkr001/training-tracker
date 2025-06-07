import { date, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id').notNull(),
  email: varchar('email').notNull(),
  name: varchar('name'),
  picture:varchar('picture'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const trainingPrograms = pgTable('training_programs', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  fullDescription: varchar('full_description').notNull(),
  duration: varchar('duration'),
  audience: varchar('audience'),
  outcomes: varchar('outcomes'), // stringified JSON
  instructor: varchar('instructor'),
  certification: varchar('certification'),
})


export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  date: date('date').notNull(),
  status: varchar('status', { enum: ['Present', 'Absent'] }).notNull(),
  role: varchar('role').notNull(),
})


export const wardens = pgTable('wardens', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  role: varchar('role').notNull(),
})

export const trainings = pgTable('trainings', {
  id: serial('id').primaryKey(),
  title: varchar('title'),
  completed: integer('completed').default(0),
  total: integer('total').default(0),
  date: timestamp('date'),
})

export const approvals = pgTable('approvals', {
  id: serial('id').primaryKey(),
  status: varchar('status'), // e.g., "pending", "approved"
})

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  message: varchar('message'),
  createdAt: timestamp('created_at').defaultNow(),
})
