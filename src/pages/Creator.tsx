import { useState } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { trpc } from "@/providers/trpc"
import { useTranslation } from "@/i18n/useTranslation"
import { Wand2, ArrowLeft, Clock, Smartphone, Monitor, Square, RectangleVertical, Loader2 } from "lucide-react"
import { toast } from "sonner"

const ratios = [
  { value: "9:16" as const, label: "9:16 Reels", icon: <Smartphone className="h-4 w-4" /> },
  { value: "1:1" as const, label: "1:1 Square", icon: <Square className="h-4 w-4" /> },
  { value: "16:9" as const, label: "16:9 Wide", icon: <Monitor className="h-4 w-4" /> },
  { value: "3:4" as const, label: "3:4 Portrait", icon: <RectangleVertical className="h-4 w-4" /> },
]

const durations = [4, 5, 6, 8, 9, 10, 12]

export default function Creator() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(8)
  const [ratio, setRatio] = useState<"9:16" | "16:9" | "1:1" | "3:4" | "4:3">("9:16")

  const createMutation = trpc.video.create.useMutation({
    onSuccess: (data) => {
      toast.success(t.creator_title)
      navigate(`/video/${data.id}`)
    },
    onError: (err) => {
      toast.error(err.message || t.creator_title)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !prompt.trim()) {
      toast.error(t.creator_project_title)
      return
    }
    createMutation.mutate({
      title,
      prompt,
      description: description || undefined,
      duration,
      ratio,
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.creator_back}
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t.creator_title}</h1>
          <p className="mt-1 text-zinc-400">{t.creator_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-zinc-300">
              {t.creator_project_title}
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.creator_project_placeholder}
              className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus:border-indigo-500"
              maxLength={255}
            />
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-medium text-zinc-300">
              {t.creator_prompt} <span className="text-zinc-500">{t.creator_prompt_hint}</span>
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.creator_prompt_placeholder}
              className="min-h-[140px] bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus:border-indigo-500 resize-none"
            />
            <p className="text-xs text-zinc-600">
              {t.creator_prompt_tip}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="desc" className="text-sm font-medium text-zinc-300">
              {t.creator_description} <span className="text-zinc-500">{t.creator_description_optional}</span>
            </Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.creator_description_placeholder}
              className="min-h-[80px] bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t.creator_duration}: {duration}s
            </Label>
            <div className="flex flex-wrap gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    duration === d
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {/* Ratio */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-300">{t.creator_format}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ratios.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRatio(r.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                    ratio === r.value
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {r.icon}
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 h-12 text-base"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t.creator_creating}
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  {t.creator_generate}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="h-12 border-white/10 text-white hover:bg-white/10"
            >
              {t.creator_cancel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
