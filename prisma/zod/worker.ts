import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const workerSchema = z.object({
  id: z.string(),
  name: z.string(),
  salary: z.number(),
  ci: z.number().int(),
  adress: z.string(),
  phoneNumber: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteWorker extends z.infer<typeof workerSchema> {
  user: CompleteUser
}

/**
 * relatedWorkerSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWorkerSchema: z.ZodSchema<CompleteWorker> = z.lazy(() => workerSchema.extend({
  user: relatedUserSchema,
}))
