import { useParams, useNavigate } from "react-router"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { trpc } from "@/providers/trpc"
import { useTranslation } from "@/i18n/useTranslation"
import { ArrowLeft, Download, Trash2, Loader2, RefreshCw, CheckCircle2, AlertCircle, Clock, Wand2, Film } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

function StatusDisplay({ status }: { status: string }) {
  const { t } = useTranslation()
  const config: Record<string, { icon: React.ReactNode; title: string; desc: string; color: string; bg: string }> = {
    pending: {
      icon: <Clock className="h-12 w-12 text-yellow-400" />,
      title: t.player_queue,
      desc: t.player_queue_desc,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/20",
    },
    processing: {
      icon: <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />,
      title: t.player_generating,
      desc: t.player_generating_desc,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    completed: {
      icon: <CheckCircle2 className="h-12 w-12 text-emerald-400" />,
      title: t.player_done,
      desc: t.player_done_desc,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    failed: {
      icon: <AlertCircle className="h-12 w-12 text-red-400" />,
      title: t.player_error,
      desc: t.player_error_desc,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
  }
  const s = config[status] || config.pending
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border p-12 ${s.bg}`}>
      {s.icon}
      <h2 className={`mt-4 text-xl font-bold ${s.color}`}>{s.title}</h2>
      <p className="mt-2 text-sm text-zinc-400 text-center max-w-sm">{s.desc}</p>
    </div>
  )
}

export default function Player() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, tInterp } = useTranslation()
  const videoId = Number(id)
  const utils = trpc.useUtils()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const { data: video, isLoading } = trpc.video.getById.useQuery(
    { id: videoId },
    { enabled: !!videoId }
  )

  const simulateMutation = trpc.video.simulateComplete.useMutation({
    onSuccess: () => {
      utils.video.getById.invalidate({ id: videoId })
      utils.video.list.invalidate()
      toast.success(t.player_done)
    },
  })

  const deleteMutation = trpc.video.delete.useMutation({
    onSuccess: () => {
      toast.success(t.player_delete_title)
      navigate("/dashboard")
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <Film className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t.player_not_found}</h1>
          <p className="text-zinc-500 mb-6">{t.player_not_found_desc}</p>
          <Button onClick={() => navigate("/dashboard")} className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.player_not_found_button}
          </Button>
        </div>
      </div>
    )
  }

  const isDone = video.status === "completed"
  const isProcessing = video.status === "processing" || video.status === "pending"

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.player_back}
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Video / Status */}
          <div className="space-y-4">
            {isDone && video.videoUrl ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full aspect-[9/16] max-h-[70vh]"
                  poster={video.thumbnailUrl || undefined}
                />
              </div>
            ) : (
              <StatusDisplay status={video.status} />
            )}

            {isProcessing && (
              <Button
                onClick={() => simulateMutation.mutate({ id: videoId })}
                disabled={simulateMutation.isPending}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90"
              >
                {simulateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.player_processing}
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {t.player_refresh}
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Film className="h-3.5 w-3.5" />
                  {video.duration}s · {video.ratio}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-300">{t.player_prompt}</h3>
              <div className="rounded-xl bg-zinc-900 border border-white/10 p-4">
                <p className="text-sm text-zinc-400 leading-relaxed">{video.prompt}</p>
              </div>
            </div>

            {video.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-300">{t.player_notes}</h3>
                <p className="text-sm text-zinc-500">{video.description}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              {isDone && video.videoUrl && (
                <a href={video.videoUrl} download target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    {t.player_download}
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/create")}
                className="w-full border-white/10 text-white hover:bg-white/10"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {t.player_create_next}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setDeleteOpen(true)}
                className="w-full text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t.player_delete_project}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{t.player_delete_title}</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {tInterp("player_delete_desc", { title: video.title })}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setDeleteOpen(false)} className="text-zinc-400 hover:text-white">
              {t.dash_cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate({ id: videoId })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? t.player_processing : t.dash_delete}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
