import { Link, useNavigate } from "react-router"
import { useAuth } from "@/hooks/useAuth"
import { useTranslation } from "@/i18n/useTranslation"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Button } from "@/components/ui/button"
import { Film, LogOut, User, Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
            <Film className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">ReelForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors">{t.nav_home}</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">{t.nav_dashboard}</Link>
              <Link to="/create" className="text-sm text-zinc-400 hover:text-white transition-colors">{t.nav_creator}</Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <User className="h-4 w-4" />
                <span className="max-w-[120px] truncate">{user?.name || t.nav_user}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {t.nav_login}
            </Button>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-zinc-950 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-zinc-400 hover:text-white">{t.nav_home}</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block text-zinc-400 hover:text-white">{t.nav_dashboard}</Link>
              <Link to="/create" onClick={() => setMobileOpen(false)} className="block text-zinc-400 hover:text-white">{t.nav_creator}</Link>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <User className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-300">{user?.name}</span>
              </div>
              <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <LogOut className="h-4 w-4" />
                <span>{t.nav_logout}</span>
              </button>
            </>
          )}
          {!isAuthenticated && (
            <Button onClick={() => { navigate("/login"); setMobileOpen(false); }} className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
              {t.nav_login}
            </Button>
          )}
          <div className="pt-2 border-t border-white/10">
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  )
}
