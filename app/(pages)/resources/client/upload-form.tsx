'use client'

import { uploadResource } from '@/app/actions/resources'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UploadForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function handleUpload(formData: FormData) {
    startTransition(() => {
      uploadResource(formData).then(() => {
        router.refresh()
      })
    })
  }

  return (
    <form action={handleUpload} className="flex flex-col md:flex-row gap-4">
      <Input
        name="file"
        type="file"
        accept=".pdf,.doc,.docx"
        required
        className="file-input border border-gray-300 rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Uploading...' : 'Upload'}
      </Button>
    </form>
  )
}
