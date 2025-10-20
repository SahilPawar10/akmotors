"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", sales: 30, marketing: 20 },
  { name: "Feb", sales: 50, marketing: 35 },
  { name: "Mar", sales: 100, marketing: 80 },
  { name: "Apr", sales: 120, marketing: 100 },
  { name: "May", sales: 80, marketing: 70 },
  { name: "Jun", sales: 140, marketing: 120 },
  { name: "Jul", sales: 130, marketing: 115 },
  { name: "Aug", sales: 180, marketing: 140 },
  { name: "Sep", sales: 110, marketing: 95 },
  { name: "Oct", sales: 150, marketing: 130 },
  { name: "Nov", sales: 100, marketing: 90 },
  { name: "Dec", sales: 160, marketing: 140 },
];

export default function SalesRevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm w-full">
      <h2 className="text-lg font-semibold mb-4">Sales Revenue</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6" // blue
            strokeWidth={2}
            dot={false}
            fillOpacity={0.3}
          />
          <Line
            type="monotone"
            dataKey="marketing"
            stroke="#a855f7" // purple
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
