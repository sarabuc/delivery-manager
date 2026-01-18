import { Bell, ShieldCheck } from "lucide-react";

import { IncomeCharts } from "../components/IncomeCharts";
import { IncomeTable } from "../components/IncomeTable";
import { SummaryCards } from "../components/SummaryCards";
import { UploadZone } from "../components/UploadZone";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useBackendStatus } from "../hooks/useBackendStatus";

export default function App() {
  const { data, isError } = useBackendStatus();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Income Insights</p>
              <h1 className="text-lg font-semibold text-white">
                Bank Statement Intelligence
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-slate-800 text-slate-200">
              {isError ? "Backend offline" : data?.status ?? "Checking API"}
            </Badge>
            <Button variant="secondary">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
              OCR-powered
            </p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Understand every deposit in minutes.
            </h2>
            <p className="text-base text-slate-400">
              Securely upload bank statements, extract income transactions, and
              visualize growth trends with AI-driven categorization.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button>Run OCR analysis</Button>
              <Button variant="ghost">View report</Button>
            </div>
          </div>
          <UploadZone />
        </section>

        <SummaryCards />
        <IncomeCharts />
        <IncomeTable />
      </main>
    </div>
  );
}
