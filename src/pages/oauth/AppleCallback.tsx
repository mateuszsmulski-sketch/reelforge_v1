import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AppleCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const callbackMutation = trpc.oauth.appleCallback.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("reelforge-token", data.token);
      toast.success("Logged in with Apple!");
      window.location.href = "/dashboard";
    },
    onError: (err) => {
      setError(err.message || "Apple login failed");
      toast.error(err.message || "Apple login failed");
    },
  });

  useEffect(() => {
    // Apple OAuth returns id_token in URL fragment
    const hash = window.location.hash;
    if (!hash) {
      setError("No OAuth data received");
      return;
    }

    const params = new URLSearchParams(hash.slice(1));
    const idToken = params.get("id_token");

    if (!idToken) {
      const errorDesc = params.get("error_description") || "No ID token";
      setError(errorDesc);
      return;
    }

    callbackMutation.mutate({ idToken });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <p className="text-zinc-400">Connecting with Apple...</p>
      </div>
    </div>
  );
}
