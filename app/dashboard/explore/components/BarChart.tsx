"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const propertyData = [
  { name: "Agricultural", value: 140000 },
  { name: "Ashoorkhana", value: 15000 },
  { name: "Building", value: 10000 },
  { name: "Chilla", value: 10000 },
  { name: "Dargah", value: 30000 },
  { name: "Darul-Uloom", value: 150000 },
  { name: "Graveyard", value: 90000 },
  { name: "House", value: 5000 },
  { name: "Huja", value: 5000 },
  { name: "Idgah", value: 10000 },
  { name: "Imambara", value: 10000 },
  { name: "Khanqah", value: 10000 },
  { name: "Madarsa", value: 5000 },
  { name: "Maktab", value: 15000 },
  { name: "Mosque", value: 120000 },
  { name: "Musafirkhana", value: 2000 },
  { name: "Orchard", value: 2000 },
  { name: "Others", value: 65000 },
  { name: "Plot", value: 65000 },
  { name: "Pond", value: 5000 },
  { name: "School", value: 2000 },
  { name: "Shop", value: 110000 },
  { name: "Takiya", value: 8000 },
];

export default function PropertyTypeBarChart() {
  return (
    <Card className="w-full dark:bg-gray-900 shadow-lg mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Types of Immovable Properties
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={propertyData}
              margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={90}
                tick={{ fill: "#ccc", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#ccc", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#001f80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
