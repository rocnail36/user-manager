"use server";

import { revalidatePath } from "next/cache";
import {
  createWorker,
  deleteWorker,
  updateWorker,
} from "@/lib/api/workers/mutations";
import {
  WorkerId,
  NewWorkerParams,
  UpdateWorkerParams,
  workerIdSchema,
  insertWorkerParams,
  updateWorkerParams,
} from "@/lib/db/schema/workers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkers = () => revalidatePath("/workers");

export const createWorkerAction = async (input: NewWorkerParams) => {
  try {
    const payload = insertWorkerParams.parse(input);
    await createWorker(payload);
    revalidateWorkers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkerAction = async (input: UpdateWorkerParams) => {
  try {
    const payload = updateWorkerParams.parse(input);
    await updateWorker(payload.id, payload);
    revalidateWorkers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkerAction = async (input: WorkerId) => {
  try {
    const payload = workerIdSchema.parse({ id: input });
    await deleteWorker(payload.id);
    revalidateWorkers();
  } catch (e) {
    return handleErrors(e);
  }
};