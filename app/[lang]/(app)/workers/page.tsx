import { Suspense } from "react";

import Loading from "@/app/[lang]/loading";
import WorkerList from "@/components/workers/WorkerList";
import { getWorkers } from "@/lib/api/workers/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function WorkersPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Workers</h1>
        </div>
        <Workers />
      </div>
    </main>
  );
}

const Workers = async () => {
  await checkAuth();

  const { workers } = await getWorkers();
  
  return (
    <Suspense fallback={<Loading />}>
      <WorkerList workers={workers}  />
    </Suspense>
  );
};
