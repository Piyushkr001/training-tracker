'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { uploadResource, deleteResource, getResources } from '@/app/actions/resources'
import { toast } from 'sonner'
import { UploadCloud, Trash2, FileDown, Loader } from 'lucide-react'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'

export type Resource = {
  id: string
  name: string
  url: string
  createdAt: string
}

const sampleResources: Resource[] = [
  {
    id: 'sample-1',
    name: 'Fire Safety Manual.pdf',
    url: 'https://www.aiims.edu/images/pdf/notice/Fire%20Safety%20manual%20-27-10-21.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    name: 'Evacuation Guide.pdf',
    url: 'https://www.osha.gov/sites/default/files/publications/osha3088.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    name: 'First Aid Handbook.pdf',
    url: 'https://www.indianredcross.org/publications/FA-manual.pdf',
    createdAt: new Date().toISOString(),
  },
]

export default function ResourcePage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // ✅ Fetch all resources from DB + combine with samples
  useEffect(() => {
    async function fetchResources() {
      try {
        const real = await getResources()
        const realFormatted: Resource[] = real.map((r) => ({
          ...r,
          id: String(r.id),
          createdAt: new Date(r.createdAt).toISOString(),
        }))
        const samplesFormatted = sampleResources.map((s) => ({
          ...s,
          id: String(s.id),
        }))
        setResources([...samplesFormatted, ...realFormatted])
      } catch {
        toast.error('❌ Failed to fetch resources.')
      }
    }

    fetchResources()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function handleUpload(formData: FormData) {
    setIsUploading(true)
    try {
      const uploaded = await uploadResource(formData)
      if (uploaded) {
        const formattedUploaded: Resource = {
          ...uploaded,
          id: String(uploaded.id),
          createdAt: new Date(uploaded.createdAt).toISOString(),
        }
        setResources((prev) => [formattedUploaded, ...prev])
        toast.success(`✅ ${uploaded.name} uploaded successfully.`)
        setFilePreviewUrl(null)
        setSelectedFile(null)
      }
    } catch {
      toast.error('❌ Failed to upload file. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const fileUrl = URL.createObjectURL(file)
      setFilePreviewUrl(fileUrl)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedFile) return
    const formData = new FormData()
    formData.append('file', selectedFile)
    await handleUpload(formData)
  }

  async function handleDelete(id: string) {
    try {
      await deleteResource(id)
      setResources((prev) => prev.filter((r) => r.id !== id))
      toast.success('🗑️ Resource deleted.')
    } catch {
      toast.error('❌ Failed to delete resource.')
    }
  }

  return (
    <div className="relative p-6 min-h-screen overflow-hidden bg-gradient-to-r from-sky-50 via-white to-sky-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <FlickeringGrid
        className="absolute inset-0 z-0 w-full h-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={viewport.height}
        width={viewport.width}
      />

      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-teal-300 mb-6">
          📚 Resources
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 bg-white/80 dark:bg-gray-900/40 shadow-inner"
        >
          <Input name="file" type="file" className="w-full text-sm" required onChange={handleFileChange} />
          <Button type="submit" disabled={isUploading || !selectedFile} className="flex items-center gap-2">
            {isUploading ? (
              <>
                <Loader className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud size={16} />
                Upload
              </>
            )}
          </Button>
        </form>

        {/* PDF Preview */}
        {filePreviewUrl && selectedFile?.type === 'application/pdf' && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">📄 Preview: {selectedFile.name}</h2>
            <iframe src={filePreviewUrl} title="PDF Preview" className="w-full h-[500px] border rounded-lg" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          {resources.map((res) => {
            const isSample = String(res.id).startsWith('sample-')
            return (
              <Card
                key={res.id}
                className="bg-white/80 dark:bg-gray-900/40 shadow-md border border-blue-100 dark:border-gray-800 rounded-xl transition hover:shadow-lg"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-700 dark:text-blue-300 text-lg flex items-center gap-2">
                    <FileDown size={18} />
                    {res.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Download
                  </a>
                  {!isSample ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(res.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400 italic">sample</span>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
