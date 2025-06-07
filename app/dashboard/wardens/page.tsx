'use client'

import { useEffect, useState } from 'react'
import { getAllWardens, addWarden, deleteWarden } from '@/app/actions/warden'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Trash } from 'lucide-react'

interface Warden {
  id: number
  name: string
  role: string
}

export default function WardensPage() {
  const [wardens, setWardens] = useState<Warden[]>([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await getAllWardens()
      setWardens(data)
    }
    fetchData()
  }, [])

  const filtered = wardens.filter((w) =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = async () => {
    if (!name || !role) return
    await addWarden({ name, role })
    const updated = await getAllWardens()
    setWardens(updated)
    setName('')
    setRole('')
    setIsDialogOpen(false)
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this warden?')
    if (!confirm) return
    await deleteWarden(id)
    const updated = await getAllWardens()
    setWardens(updated)
  }

  return (
    <div className="p-6 flex flex-col gap-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
        <Input
          placeholder="Search wardens by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full ml-2 sm:w-1/2"
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2 mr-2 items-center">
              <Plus className="w-4 h-4" />
              Add Warden
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Warden</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 ml-2 lg:grid-cols-3 gap-4">
        {filtered.map((warden) => (
          <Card key={warden.id}>
            <CardContent className="p-4 relative">
              <h3 className="text-lg font-semibold">{warden.name}</h3>
              <p className="text-sm text-muted-foreground">{warden.role}</p>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(warden.id)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
