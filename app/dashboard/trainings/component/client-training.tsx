'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'
import { addTraining, deleteTraining } from '@/app/actions/training'
import { toast } from 'sonner' // Ensure 'sonner' is installed

interface Training {
  id: number
  title: string
  fullDescription: string
  description: string
  date?: string
}

export default function ClientTrainings({ initialTrainings }: { initialTrainings: Training[] }) {
  const [trainings, setTrainings] = useState(initialTrainings)
  const [searchTerm, setSearchTerm] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTrainings = trainings.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTraining = async () => {
    if (!title || !date || !description) return

    const res = await addTraining({ title, description })

    setTrainings([
      ...trainings,
      {
        id: Date.now(),
        title,
        fullDescription: description,
        description,
        date,
      },
    ])

    setTitle('')
    setDate('')
    setDescription('')
    setIsDialogOpen(false)
  }

  const handleDeleteTraining = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this training?')
    if (!confirmed) return

    try {
      await deleteTraining(id)
      setTrainings((prev) => prev.filter((t) => t.id !== id))
      toast.success('Training deleted successfully.')
    } catch (error) {
      toast.error('Failed to delete training.')
      console.error(error)
    }
  }

  return (
    <div className="p-6 flex flex-col gap-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Input
          type="text"
          placeholder="Search trainings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full ml-2 md:w-1/2"
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center mr-2 gap-2 w-full md:w-auto">
              <Plus className="w-4 h-4" />
              Add Training
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Training</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Training title"
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
              </div>              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTraining}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trainings List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrainings.map((training) => (
          <Card
            key={training.id}
            className="border border-border bg-card ml-2 text-foreground hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{training.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {training.date
                      ? new Date(training.date).toLocaleDateString()
                      : 'No date'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {training.description}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                  onClick={() => handleDeleteTraining(training.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}