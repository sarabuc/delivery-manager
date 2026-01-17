import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

const cards = [
  {
    title: "Total income",
    value: "$48,320",
    change: "+12.4%",
    icon: DollarSign,
  },
  {
    title: "Average monthly",
    value: "$4,026",
    change: "+4.1%",
    icon: TrendingUp,
  },
  {
    title: "Income growth",
    value: "8 months",
    change: "Stable",
    icon: ArrowUpRight,
  },
];

export function SummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-slate-400">{card.title}</p>
                <h3 className="text-2xl font-semibold text-white">{card.value}</h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <Badge className="bg-emerald-500/20 text-emerald-300">
                {card.change}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
