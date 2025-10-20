type StatsCardProps = {
  title: string;
  value: string | number;
  change: string;
  positive?: boolean;
  icon: React.ReactNode;
  color?: "purple" | "red" | "blue" | "orange"; // added color prop
};

export default function StatsCard({
  title,
  value,
  change,
  positive,
  icon,
  color = "purple",
}: StatsCardProps) {
  const gradientMap = {
    purple: "from-purple-500 to-purple-700",
    red: "from-red-500 to-red-700",
    blue: "from-blue-500 to-blue-700",
    orange: "from-orange-400 to-orange-600",
  };

  return (
    <div
      className={`bg-gradient-to-br ${gradientMap[color]} text-white p-5 rounded-2xl shadow-md flex flex-col flex-1 transition-transform hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium opacity-90">{title}</div>
        <div className="opacity-80">{icon}</div>
      </div>

      <div className="text-3xl font-semibold mt-2">${value}</div>

      <div
        className={`text-sm mt-2 font-medium ${
          positive ? "text-green-300" : "text-red-300"
        }`}
      >
        {positive ? "▲" : "▼"} {change}
      </div>
    </div>
  );
}
