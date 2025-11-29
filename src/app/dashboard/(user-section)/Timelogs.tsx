"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

function formatMinutesToHM(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs} hr${hrs !== 1 ? "s" : ""} : ${mins} mins`;
}

const baseChartData = [
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
  { day: "Sunday" },
];

const chartConfig = {
  workingMinutes: {
    label: "Working Hours",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TimeLogs({ timelogs }: { timelogs: number[] }) {
  const updatedData = baseChartData.map((el, index) => ({
    day: el.day,
    workingMinutes: timelogs[index] ?? 0,
  }));

  return (
    <Card className="h-[300px] w-full">
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={updatedData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => String(value).slice(0, 3)} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => formatMinutesToHM(value as number)}
            />

            <Bar dataKey="workingMinutes" fill="var(--chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
