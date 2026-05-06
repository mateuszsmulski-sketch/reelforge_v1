import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Sparkles } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL || "https://auth.kimi.com";
  const appID = import.meta.env.VITE_APP_ID || "19df60a7-5882-85c8-8000-0000c587b851";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <Card className="relative w-full max-w-md bg-zinc-900/80 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
            <Film className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">{t.login_title}</CardTitle>
          <p className="mt-2 text-sm text-zinc-400">
            {t.login_subtitle}
          </p>
        </CardHeader>
        <CardContent className="pb-8">
          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 h-12 text-base"
            size="lg"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {t.login_button}
          </Button>
          <p className="mt-4 text-xs text-center text-zinc-600">
            {t.login_terms}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
