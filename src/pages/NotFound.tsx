import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { Film, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <Card className="relative w-full max-w-md bg-zinc-900/80 border-white/10 backdrop-blur-sm text-center">
        <CardHeader className="pt-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
            <Film className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-5xl font-bold text-white">{t.notfound_title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-8 space-y-4">
          <p className="text-zinc-400">{t.notfound_desc}</p>
          <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90">
            <Link to="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.notfound_button}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
