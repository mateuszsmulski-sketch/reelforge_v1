import { Link } from "react-router"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Film, Sparkles, Zap, Smartphone, Wand2, Clock, ArrowRight, Play, Star } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useTranslation } from "@/i18n/useTranslation"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero_badge}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {t.hero_title}{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {t.hero_title_highlight}
            </span>{" "}
            {t.hero_title_suffix}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            {t.hero_desc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={isAuthenticated ? "/create" : "/login"}>
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 px-8 h-12 text-base">
                <Wand2 className="mr-2 h-5 w-5" />
                {t.hero_cta_primary}
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base">
                <Play className="mr-2 h-5 w-5" />
                {t.hero_cta_secondary}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "10x", label: t.hero_stat_1 },
              { value: "9:16", label: t.hero_stat_2 },
              { value: "4-12s", label: t.hero_stat_3 },
              { value: "100%", label: t.hero_stat_4 },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/5 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.how_title}</h2>
            <p className="mt-4 text-zinc-400">{t.how_subtitle}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Wand2 className="h-6 w-6" />,
                title: t.how_step1_title,
                desc: t.how_step1_desc,
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: t.how_step2_title,
                desc: t.how_step2_desc,
              },
              {
                icon: <Smartphone className="h-6 w-6" />,
                title: t.how_step3_title,
                desc: t.how_step3_desc,
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-indigo-500/30 transition-colors">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5 py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.features_title}</h2>
            <p className="mt-4 text-zinc-400">{t.features_subtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Clock className="h-5 w-5" />, title: t.feat_1_title, desc: t.feat_1_desc },
              { icon: <Smartphone className="h-5 w-5" />, title: t.feat_2_title, desc: t.feat_2_desc },
              { icon: <Sparkles className="h-5 w-5" />, title: t.feat_3_title, desc: t.feat_3_desc },
              { icon: <Film className="h-5 w-5" />, title: t.feat_4_title, desc: t.feat_4_desc },
              { icon: <Zap className="h-5 w-5" />, title: t.feat_5_title, desc: t.feat_5_desc },
              { icon: <Star className="h-5 w-5" />, title: t.feat_6_title, desc: t.feat_6_desc },
            ].map((feat) => (
              <div key={feat.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  {feat.icon}
                </div>
                <h3 className="font-semibold mb-1">{feat.title}</h3>
                <p className="text-sm text-zinc-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">{t.cta_title}</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            {t.cta_desc}
          </p>
          <Link to={isAuthenticated ? "/create" : "/login"}>
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 px-8 h-12 text-base">
              {t.cta_button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-violet-600">
              <Film className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold">ReelForge AI</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-zinc-500">
            <span>© 2025 ReelForge. {t.footer_rights}</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-indigo-400 font-medium">{t.footer_author}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
