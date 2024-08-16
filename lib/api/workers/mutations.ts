import { db } from "@/lib/db/index";
import { 
  WorkerId, 
  NewWorkerParams,
  UpdateWorkerParams, 
  updateWorkerSchema,
  insertWorkerSchema, 
  workerIdSchema 
} from "@/lib/db/schema/workers";
import { getUserAuth } from "@/lib/auth/utils";

export const createWorker = async (worker: NewWorkerParams) => {
  const { session } = await getUserAuth();
  const newWorker = insertWorkerSchema.parse({ ...worker, userId: session?.user.id! });
  try {
    const w = await db.worker.create({ data: newWorker });
    return { worker: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorker = async (id: WorkerId, worker: UpdateWorkerParams) => {
  const { session } = await getUserAuth();
  const { id: workerId } = workerIdSchema.parse({ id });
  const newWorker = updateWorkerSchema.parse({ ...worker, userId: session?.user.id! });
  try {
    const w = await db.worker.update({ where: { id: workerId, userId: session?.user.id! }, data: newWorker})
    return { worker: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorker = async (id: WorkerId) => {
  const { session } = await getUserAuth();
  const { id: workerId } = workerIdSchema.parse({ id });
  try {
    const w = await db.worker.delete({ where: { id: workerId, userId: session?.user.id! }})
    return { worker: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

