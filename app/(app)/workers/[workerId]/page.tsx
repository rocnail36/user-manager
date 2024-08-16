import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getWorkerById } from "@/lib/api/workers/queries";
import OptimisticWorker from "./OptimisticWorker";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function WorkerPage({
  params,
}: {
  params: { workerId: string };
}) {

  return (
    <main className="overflow-auto">
      <Worker id={params.workerId} />
    </main>
  );
}

const Worker = async ({ id }: { id: string }) => {
  await checkAuth();

  const { worker } = await getWorkerById(id);
  

  if (!worker) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="workers" />
        <OptimisticWorker worker={worker}  />
      </div>
    </Suspense>
  );
};
