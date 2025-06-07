'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarDays, Plus } from 'lucide-react'
import { addAttendance, deleteAttendance } from '@/app/actions/attendance'

interface Attendance {
  id: number
  name: string
  date: string
  status: 'Present' | 'Absent'
  role: string
}

export default function ClientAttendance({
  initialAttendance,
}: {
  initialAttendance: Attendance[]
}) {
  const [attendance, setAttendance] = useState<Attendance[]>(initialAttendance)
  const [search, setSearch] = useState('')
  const [warden, setWarden] = useState('')
  const [status, setStatus] = useState<'Present' | 'Absent' | ''>('')
  const [date, setDate] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filtered = attendance.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddAttendance = async () => {
    if (!warden || !date || !status) return

    const newEntry = await addAttendance({
      name: warden,
      date,
      status,
      role: 'Warden',
    })

    setAttendance([...attendance, newEntry])
    setWarden('')
    setStatus('')
    setDate('')
    setIsDialogOpen(false)
  }

  const handleDeleteAttendance = async (id: number) => {
    await deleteAttendance(id)
    setAttendance((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="p-6 flex flex-col gap-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ml-2 md:w-1/2"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center mr-2 gap-2 w-full md:w-auto">
              <Plus className="w-4 h-4" />
              Add Attendance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="warden">Warden</Label>
                <Input
                  id="warden"
                  placeholder="Warden name"
                  value={warden}
                  onChange={(e) => setWarden(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as 'Present' | 'Absent')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <SelectItem value="Absent">Absent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAttendance}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Attendance Cards */}
      <div className="grid grid-cols-1 ml-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{entry.name}</h3>
              <div className="text-sm text-muted-foreground flex items-center gap-2" suppressHydrationWarning>
                <CalendarDays className="w-4 h-4" />
                {new Date(entry.date).toLocaleDateString()}
              </div>
              <div className="text-sm">Role: {entry.role}</div>
              <div
                className={`text-sm font-semibold ${
                  entry.status === 'Present'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {entry.status}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteAttendance(entry.id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          No attendance records found.
        </p>
      )}
    </div>
  )
}
