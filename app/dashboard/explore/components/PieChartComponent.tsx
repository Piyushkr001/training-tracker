"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type PieChartsSectionProps = {
  data?: Record<string, any>[]; // Optional, for future dynamic charts
};

const statusData = [
  { name: "Alienated", value: 984 },
  { name: "Encroached", value: 58890 },
  { name: "Information Not Available", value: 436356 },
  { name: "Litigation (External)", value: 7835 },
  { name: "Litigation (Internal)", value: 5365 },
  { name: "Non-Encumbered", value: 340003 },
  { name: "Others", value: 23552 },
];

const managementData = [
  { name: "Administrator", value: 14549 },
  { name: "Management Committee", value: 128138 },
  { name: "Mutawalli", value: 217079 },
  { name: "None(Alienation,etc)", value: 3889 },
  { name: "Waqf Board", value: 95279 },
  { name: "Management not entered", value: 414051 },
];

const statusColors = [
  "#8B0000",
  "#800080",
  "#D2691E",
  "#228B22",
  "#66CDAA",
  "#FFA500",
  "#4682B4",
];

const managementColors = [
  "#008B8B",
  "#B22222",
  "#9370DB",
  "#9ACD32",
  "#B0E0E6",
  "#BDB76B",
];

export default function PieChartsSection({ data }: PieChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 py-6">
      {/* Status Pie Chart */}
      <Card className="dark:bg-gray-900 shadow-lg">
        <CardContent className="h-[400px] flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Immovable Property Status
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
                labelLine={false}
                isAnimationActive={false}
                minAngle={5}
              >
                {statusData.map((_, index) => (
                  <Cell
                    key={`status-${index}`}
                    fill={statusColors[index % statusColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Management Pie Chart */}
      <Card className="dark:bg-gray-900 shadow-lg">
        <CardContent className="h-[400px] flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Immovable Property Management
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={managementData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
                labelLine={false}
                isAnimationActive={false}
                minAngle={5}
              >
                {managementData.map((_, index) => (
                  <Cell
                    key={`management-${index}`}
                    fill={managementColors[index % managementColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
