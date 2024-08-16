import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type WorkerId, workerIdSchema } from "@/lib/db/schema/workers";

export const getWorkers = async () => {
  const { session } = await getUserAuth();
  const w = await db.worker.findMany({ where: {userId: session?.user.id!}});
  return { workers: w };
};

export const getWorkerById = async (id: WorkerId) => {
  const { session } = await getUserAuth();
  const { id: workerId } = workerIdSchema.parse({ id });
  const w = await db.worker.findFirst({
    where: { id: workerId, userId: session?.user.id!}});
  return { worker: w };
};


