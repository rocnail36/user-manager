import React from 'react'
import Chart from './chart'
import { DataTable } from '../DataTables/columns'
import { twMerge } from 'tailwind-merge'
import { getSalaryTendencyByDays, getWorkerAvgSalary, getWorkersBestSalary } from '@/lib/api/workers/queries'
import { ChartConfig } from '@/components/ui/chart'
import { Dictionary } from '@/app/dictionaries/types'
import { columnsWorkerReport } from '../DataTables/dataTableReport'
import { ColumnDef } from '@tanstack/react-table'
import { CompleteUser } from '@/prisma/zod'
import { Worker } from '@/lib/db/schema/workers'
export const Report = async({d}:{d:Dictionary}) => {

  const salaryTendencyPromise = getSalaryTendencyByDays();
  const bestWorkerSalaryPromise = getWorkersBestSalary();
  const averageWorkerSalaryPromise = getWorkerAvgSalary();

  const [salaryTendency, bestWorkerSalary, averageWorkerSalary] = await Promise.all([
    salaryTendencyPromise,
    bestWorkerSalaryPromise,
    averageWorkerSalaryPromise,
  ]);

  
    const chartConfig = {
      salary: {
        label: "Salary",
        color: "#2563eb",
      },
    } satisfies ChartConfig;
  
    const chartData = salaryTendency
    const columns =  columnsWorkerReport(d)

  return (
    
      
    <div className="px-4 py-8 bg-background">
    <h1 className="mb-4">{d.workers.report.title}</h1>
      <div className="px-12">
        <div className="mb-12">
          <h2 className='text-xl'>{d.workers.report.salaryTendency}</h2>
          <Chart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <div className="flex-col mb-4">
            <h2 className="text-xl mb-2">{d.workers.report.salaryAverage}</h2>
          <p className={twMerge("text-[56px] font-bold ")}>
            ${averageWorkerSalary.salary?.toFixed(2)}
          </p>
        </div>
        <h2 className="text-xl mb-2">{d.workers.report.bestSalary}</h2>
        <DataTable Isreport columns={(columns as ColumnDef<Worker>[])} data={bestWorkerSalary}/>
      </div>
    </div>
    
  )
}
