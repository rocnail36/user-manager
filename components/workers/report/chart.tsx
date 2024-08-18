"use client"
import { ChartConfig, ChartContainer , ChartTooltip, ChartTooltipContent} from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart ,XAxis } from 'recharts'

type Props = {
    chartConfig:ChartConfig,
    chartData: {
        day: string;
        salary: number;
    }[]  ,
}

export const Chart = ({chartConfig, chartData}:Props) => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] min-w-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
      <XAxis
      dataKey="day"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0,3)}
    />
       <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="salary" fill="#2563eb" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export default Chart