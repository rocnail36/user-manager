import GeneratePdf from '@/components/pdf/GeneratePdf'
import { ChartConfig } from '@/components/ui/chart'
import { DataTable } from '@/components/workers/DataTables/columns'
import { columnsWorkersReport } from '@/components/workers/DataTables/dataTables'
import Chart from '@/components/workers/report/chart'
import { getSalaryTendencyByDays, GetWorkerAvgSalary, getWorkersBestSalary } from '@/lib/api/workers/queries'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const page = async() => {

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
    <div>
          <GeneratePdf imgSize={[20, 10, 200, 200]}>
      
      <div className="px-4 py-8 bg-background">
      <h1 className="mb-4">Report</h1>
        <div className="px-12">
          <div className="mb-12">
            <h2> salary tendency last 7 days</h2>
            <Chart chartConfig={chartConfig} chartData={chartData} />
          </div>

          <div className="flex-col mb-4">
            <h2 className="mb-2">Salary Average</h2>
            <p className={twMerge("text-[56px] font-bold ")}>
              ${SalaryAvg.salary?.toFixed(2)}
            </p>
          </div>
          <h2 className="mb-2">top 10 workers with best salary</h2>
          <DataTable Isreport columns={columnsWorkersReport} data={BestWorkerSalary}/>
        </div>
      </div>
      </GeneratePdf>
    </div>
  )
}

export default page