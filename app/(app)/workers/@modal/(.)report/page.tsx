export const dynamic = "force-dynamic";
import {
  getSalaryTendencyByDays,
  getWorkersBestSalary,
  GetWorkerAvgSalary,
} from "@/lib/api/workers/queries";
import React from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import Chart from "@/components/workers/report/chart";
import { twMerge } from "tailwind-merge";
import { DataTable } from "@/components/workers/DataTables/columns";
import { columnsWorkersReport } from "@/components/workers/DataTables/dataTables";

const page = async () => {
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
    <div
      className={twMerge(
        "fixed bg-background shadow-2xl rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-4"
      )}
    >
      <div className="px-4 overflow-y-scroll max-h-[600px]">
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
    </div>
  );
};

export default page;
