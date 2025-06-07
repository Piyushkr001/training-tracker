import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface AddWardenDialogProps {
  onAdd: (warden: { name: string; role: string }) => void
}

export function AddWardenDialog({ onAdd }: AddWardenDialogProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (!name || !role) return
    onAdd({ name, role })
    setName('')
    setRole('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Warden
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Warden</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
