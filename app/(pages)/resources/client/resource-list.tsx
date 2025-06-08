'use client'

import { deleteResource } from '@/app/actions/resources'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type Resource = {
  id: string
  name: string
  url: string
  createdAt: string
}

export default function ResourceList({ resources = [] }: { resources?: Resource[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string) => {
    startTransition(() => {
      deleteResource(id).then(() => {
        router.refresh()
      })
    })
  }

  if (!resources.length) {
    return <p className="text-gray-600 dark:text-gray-300">No resources uploaded yet.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {resources.map((res) => (
        <div
          key={res.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded p-4 bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col">
            <p className="font-medium text-gray-800 dark:text-white">{res.name}</p>
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline dark:text-blue-400"
            >
              Download
            </a>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(res.id)}
            disabled={isPending}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
