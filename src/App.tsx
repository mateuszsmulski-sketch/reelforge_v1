import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Creator from "./pages/Creator"
import Player from "./pages/Player"
import NotFound from "./pages/NotFound"
import { useAuth } from "./hooks/useAuth"
import { Toaster } from "@/components/ui/sonner"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Creator /></ProtectedRoute>} />
        <Route path="/video/:id" element={<ProtectedRoute><Player /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}
