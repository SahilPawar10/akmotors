"use client";

import { useState } from "react";
import { DollarSign, Users, ShoppingCart, BarChart2 } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import SalesRevenueChart from "@/components/admin/SalesRevenueChart";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const years = [2023, 2024, 2025];

const initialData = [
  { name: "Jan", sales: 40, marketing: 24 },
  { name: "Feb", sales: 30, marketing: 13 },
  { name: "Mar", sales: 20, marketing: 98 },
  { name: "Apr", sales: 27, marketing: 39 },
  { name: "May", sales: 18, marketing: 48 },
];

export default function AdminDashboard() {
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [data, setData] = useState(initialData);

  const handleFilterChange = (month: string, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);

    // TODO: Fetch or filter data based on month/year
    console.log("Selected:", month, year);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 px-2">
        <select
          value={selectedMonth}
          onChange={(e) => handleFilterChange(e.target.value, selectedYear)}
          className="border rounded p-2"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) =>
            handleFilterChange(selectedMonth, Number(e.target.value))
          }
          className="border rounded p-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Credits"
          value="10,432"
          change="2.5%"
          positive
          color="purple"
          icon={<ShoppingCart />}
        />
        <StatsCard
          title="Total Debits"
          value="5,132"
          change="1.5%"
          positive
          color="red"
          icon={<DollarSign />}
        />
        <StatsCard
          title="Total Profits"
          value="4,482"
          change="3.4%"
          color="blue"
          icon={<BarChart2 />}
        />
        <StatsCard
          title="Total Customers"
          value="3,532"
          change="4.5%"
          color="orange"
          icon={<Users />}
        />
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <SalesRevenueChart />
      </div>
    </div>
  );
}
