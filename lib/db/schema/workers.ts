import { workerSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getWorkers } from "@/lib/api/workers/queries";


// Schema for workers - used to validate API requests
const baseSchema = workerSchema.omit(timestamps)

export const insertWorkerSchema = baseSchema.omit({ id: true });
export const insertWorkerParams = baseSchema.extend({
  salary: z.coerce.number(),
  ci: z.coerce.number({message:"error"}),
}).omit({ 
  id: true,
  userId: true
});

export const updateWorkerSchema = baseSchema;
export const updateWorkerParams = updateWorkerSchema.extend({
  salary: z.coerce.number(),
  ci: z.coerce.number(),

}).omit({ 
  userId: true
});
export const workerIdSchema = baseSchema.pick({ id: true });

// Types for workers - used to type API request params and within Components
export type Worker = z.infer<typeof workerSchema>;
export type NewWorker = z.infer<typeof insertWorkerSchema>;
export type NewWorkerParams = z.infer<typeof insertWorkerParams>;
export type UpdateWorkerParams = z.infer<typeof updateWorkerParams>;
export type WorkerId = z.infer<typeof workerIdSchema>["id"];
    
// this type infers the return from getWorkers() - meaning it will include any joins
export type CompleteWorker = Awaited<ReturnType<typeof getWorkers>>["workers"][number];

