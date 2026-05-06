import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Film, Sparkles, UserPlus, LogIn } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("reelforge-token", data.token);
      toast.success("Logged in successfully!");
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      toast.error(err.message || "Login failed");
    },
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("reelforge-token", data.token);
      toast.success("Account created!");
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      toast.error(err.message || "Registration failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      loginMutation.mutate({ email, password });
    } else {
      if (!name.trim()) {
        toast.error("Name is required");
        return;
      }
      registerMutation.mutate({ name, email, password });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <Card className="relative w-full max-w-md bg-zinc-900/80 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
            <Film className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {mode === "login" ? "Welcome back" : "Create account"}
          </CardTitle>
          <p className="mt-2 text-sm text-zinc-400">
            {mode === "login"
              ? "Sign in to your ReelForge account"
              : "Start creating viral AI videos for free"}
          </p>
        </CardHeader>
        <CardContent className="pb-8">
          {/* Toggle */}
          <div className="flex rounded-lg bg-white/5 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "login"
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "register"
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label className="text-zinc-300">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-zinc-300">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500"
                required
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 h-12 text-base"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Please wait...
                </span>
              ) : mode === "login" ? (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
