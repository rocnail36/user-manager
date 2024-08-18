import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type WorkerId, workerIdSchema } from "@/lib/db/schema/workers";
import { subDays, startOfDay } from "date-fns";
import { obtenerUltimos7Dias } from "@/lib/utils";

export const getWorkers = async () => {
  const { session } = await getUserAuth();
  const w = await db.worker.findMany({ where: { userId: session?.user.id! } });
  return { workers: w };
};

export const getWorkerById = async (id: WorkerId) => {
  const { session } = await getUserAuth();
  const { id: workerId } = workerIdSchema.parse({ id });
  const w = await db.worker.findFirst({
    where: { id: workerId, userId: session?.user.id! },
  });
  return { worker: w };
};

export const GetWorkerAvgSalary = async () => {
  const session = await getUserAuth();
  const data = await db?.worker.aggregate({
    _avg: {
      salary: true,
    },
    where: {
      userId: session.session?.user.id,
    },
  });
  return data._avg;
};

export const getWorkersBestSalary = async () => {
  const session = await getUserAuth();
  const data = await db.worker.findMany({
    where: {
      userId: session.session?.user.id,
    },
    orderBy: {
      salary: "desc",
    },
    take: 10,
  });

  return data;
};

export const getSalaryTendencyByDays = async () => {
  const session = await getUserAuth();

  const tenDaysAgo = subDays(new Date(), 10);

  const users = await db.worker.findMany({
    select:{salary:true,createdAt:true},
    where: {
      createdAt: {
        gte: startOfDay(tenDaysAgo),
      },
      userId: session.session?.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedUsers = users.reduce((acc, user) => {
    const date = user.createdAt.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += user.salary;
    return acc;
  }, {} as { [key:string]:number} );


  
 
  return obtenerUltimos7Dias(groupedUsers)

};



