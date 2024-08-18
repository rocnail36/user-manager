export const dynamic = "force-dynamic";
import {
  getSalaryTendencyByDays,
  getWorkersBestSalary,
  GetWorkerAvgSalary,
} from "@/lib/api/workers/queries";
import React, { Suspense } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import Chart from "@/components/workers/report/chart";
import { twMerge } from "tailwind-merge";
import { DataTable } from "@/components/workers/DataTables/columns";
import { columnsWorkersReport } from "@/components/workers/DataTables/dataTables";
import GeneratePdf from "@/components/pdf/GeneratePdf";
import { Fallback } from "@radix-ui/react-avatar";
import { Report } from "@/components/workers/report/Report";
import Loading from "@/app/loading";

const page = async () => {


  return (
    <div
      className={twMerge(
        "fixed min-h-[700px] bg-background shadow-2xl rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-4"
      )}
    >
      <GeneratePdf imgSize={[20, 10, 300, 200]}>
      <Suspense fallback={<Loading/>}>
          <Report/>
      </Suspense>
      </GeneratePdf>
    </div>
  );
};

export default page;
