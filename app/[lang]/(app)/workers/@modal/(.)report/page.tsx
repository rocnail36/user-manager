export const dynamic = "force-dynamic";
import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import GeneratePdf from "@/components/pdf/GeneratePdf";
import { Report } from "@/components/workers/report/Report";
import Loading from "@/app/[lang]/loading";
import { getDictionary, Locale } from "@/app/dictionaries/dictionaries";
import { Dictionary } from "@/app/dictionaries/types";
import { X } from "lucide-react";
import Link from "next/link";
import ButtonCloseReport from "@/components/workers/report/ButtonCloseReport";

const page = async ({params}:{params:{lang:Locale}}) => {

  const d = await getDictionary(params.lang)

  return (
    <div
      className={twMerge(
        "fixed min-h-[700px] bg-background shadow-2xl rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-4"
      )}
    >
      <ButtonCloseReport/>
      <GeneratePdf imgSize={[20, 10, 300, 200]}>
      <Suspense fallback={<Loading/>}>
          <Report d={d as Dictionary}/>
      </Suspense>
      </GeneratePdf>
    </div>
  );
};

export default page;
