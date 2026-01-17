import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "./ui/card";

const categoryData = [
  { name: "Salary", value: 28000 },
  { name: "Scholarship", value: 6000 },
  { name: "Dividends", value: 4200 },
  { name: "Benefits", value: 6100 },
  { name: "Freelance", value: 4000 },
];

const monthlyData = [
  { month: "Jan", income: 3600 },
  { month: "Feb", income: 4200 },
  { month: "Mar", income: 4100 },
  { month: "Apr", income: 5200 },
  { month: "May", income: 4700 },
  { month: "Jun", income: 5600 },
];

const trendData = [
  { month: "Jan", income: 3600, average: 3400 },
  { month: "Feb", income: 4200, average: 3600 },
  { month: "Mar", income: 4100, average: 3800 },
  { month: "Apr", income: 5200, average: 4200 },
  { month: "May", income: 4700, average: 4300 },
  { month: "Jun", income: 5600, average: 4500 },
];

export function IncomeCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Monthly income</h3>
          <p className="text-sm text-slate-400">
            Compare income inflows over the last 6 months.
          </p>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Income by category</h3>
          <p className="text-sm text-slate-400">Smartly tagged deposits.</p>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                fill="#1d4ed8"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Growth trend</h3>
          <p className="text-sm text-slate-400">
            Track income vs. rolling averages.
          </p>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" />
              <Line type="monotone" dataKey="average" stroke="#38bdf8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
