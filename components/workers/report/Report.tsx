import GeneratePdf from '@/components/pdf/GeneratePdf'
import React from 'react'
import Chart from './chart'
import { DataTable } from '../DataTables/columns'
import { twMerge } from 'tailwind-merge'
import { getSalaryTendencyByDays, GetWorkerAvgSalary, getWorkersBestSalary } from '@/lib/api/workers/queries'
import { ChartConfig } from '@/components/ui/chart'
import { columnsWorkersReport } from '../DataTables/dataTables'

export const Report = async() => {

    const promise1 = getSalaryTendencyByDays();
    const promise2 = getWorkersBestSalary();
    const promise3 = GetWorkerAvgSalary();
  
    const [salaryTendency, BestWorkerSalary, SalaryAvg] = await Promise.all([
      promise1,
      promise2,
      promise3,
    ]);
  
    
  
    const chartConfig = {
      salary: {
        label: "Salary",
        color: "#2563eb",
      },
    } satisfies ChartConfig;
  
    const chartData = salaryTendency


  return (
    
      
    <div className="px-4 py-8 bg-background">
    <h1 className="mb-4">Report</h1>
      <div className="px-12">
        <div className="mb-12">
          <h2 className='text-xl'> salary tendency last 7 days</h2>
          <Chart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <div className="flex-col mb-4">
          <h2 className="text-xl mb-2">Salary average</h2>
          <p className={twMerge("text-[56px] font-bold ")}>
            ${SalaryAvg.salary?.toFixed(2)}
          </p>
        </div>
        <h2 className="text-xl mb-2">top 10 workers with best salary</h2>
        <DataTable Isreport columns={columnsWorkersReport} data={BestWorkerSalary}/>
      </div>
    </div>
    
  )
}
