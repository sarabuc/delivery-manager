import { Download, FileSpreadsheet } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const rows = [
  { date: "2024-05-31", description: "Acme Payroll", amount: "$3,200", category: "Salary" },
  { date: "2024-05-20", description: "GOV BENEFITS", amount: "$740", category: "Government" },
  { date: "2024-05-14", description: "Dividends - Global ETF", amount: "$185", category: "Dividends" },
  { date: "2024-05-02", description: "Scholarship Fund", amount: "$900", category: "Scholarship" },
];

export function IncomeTable() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Income transactions</h3>
          <p className="text-sm text-slate-400">
            Filtered deposits extracted from the statement.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="ghost">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Category</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.description} className="border-t border-slate-800">
                  <td className="px-4 py-3 text-slate-300">{row.date}</td>
                  <td className="px-4 py-3">{row.description}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-300">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
