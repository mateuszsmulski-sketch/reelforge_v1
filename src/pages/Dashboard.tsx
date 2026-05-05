import { useNavigate } from "react-router"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { trpc } from "@/providers/trpc"
import { Plus, Play, Trash2, Clock, CheckCircle2, AlertCircle, Loader2, Film } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  }
  const icons = {
    pending: <Clock className="h-3 w-3" />,
    processing: <Loader2 className="h-3 w-3 animate-spin" />,
    completed: <CheckCircle2 className="h-3 w-3" />,
    failed: <AlertCircle className="h-3 w-3" />,
  }
  const labels = {
    pending: "Oczekuje",
    processing: "Generowanie...",
    completed: "Gotowe",
    failed: "Błąd",
  }
  const s = status as keyof typeof styles
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[s] || styles.pending}`}>
      {icons[s] || icons.pending}
      {labels[s] || status}
    </span>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const utils = trpc.useUtils()
  const { data: videos, isLoading } = trpc.video.list.useQuery()
  const deleteMutation = trpc.video.delete.useMutation({
    onSuccess: () => {
      utils.video.list.invalidate()
      toast.success("Wideo usunięte")
    },
  })
  const [previewVideo, setPreviewVideo] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Twoje filmy</h1>
            <p className="mt-1 text-zinc-400">Zarządzaj swoimi projektami AI</p>
          </div>
          <Button onClick={() => navigate("/create")} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Nowe wideo
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : !videos || videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 mb-4">
              <Film className="h-8 w-8 text-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Brak filmów</h3>
            <p className="text-zinc-500 mb-6 text-center max-w-sm">
              Nie masz jeszcze żadnych projektów. Stwórz swoje pierwsze wideo AI!
            </p>
            <Button onClick={() => navigate("/create")} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Stwórz wideo
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="group overflow-hidden border-white/10 bg-zinc-900/50 hover:border-indigo-500/30 transition-colors">
                <div className="aspect-[9/16] relative bg-zinc-900 overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (video.videoUrl) {
                      setPreviewVideo(video.videoUrl)
                    } else {
                      navigate(`/video/${video.id}`)
                    }
                  }}
                >
                  {video.videoUrl ? (
                    <video
                      src={video.videoUrl}
                      className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                      {video.status === "processing" ? (
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                      ) : (
                        <Film className="h-8 w-8 text-zinc-600" />
                      )}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {video.videoUrl && (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <StatusBadge status={video.status} />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate mb-1">{video.title}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{video.prompt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">
                      {new Date(video.createdAt).toLocaleDateString("pl-PL")}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/video/${video.id}`)}
                        className="h-8 text-zinc-400 hover:text-white hover:bg-white/10"
                      >
                        Szczegóły
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(video.id)}
                        className="h-8 text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewVideo} onOpenChange={() => setPreviewVideo(null)}>
        <DialogContent className="max-w-md bg-zinc-950 border-white/10 p-0 overflow-hidden">
          <div className="aspect-[9/16] bg-black">
            {previewVideo && (
              <video
                src={previewVideo}
                controls
                autoPlay
                className="h-full w-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Usuń wideo</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Czy na pewno chcesz usunąć ten projekt? Tej operacji nie można cofnąć.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="text-zinc-400 hover:text-white">
              Anuluj
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteId) deleteMutation.mutate({ id: deleteId })
                setDeleteId(null)
              }}
            >
              Usuń
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
