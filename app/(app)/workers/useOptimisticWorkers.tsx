
import { type Worker, type CompleteWorker } from "@/lib/db/schema/workers";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Worker>) => void;

export const useOptimisticWorkers = (
  workers: CompleteWorker[],
  
) => {
  const [optimisticWorkers, addOptimisticWorker] = useOptimistic(
    workers,
    (
      currentState: CompleteWorker[],
      action: OptimisticAction<Worker>,
    ): CompleteWorker[] => {
      const { data } = action;

      

      const optimisticWorker = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticWorker]
            : [...currentState, optimisticWorker];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticWorker } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticWorker, optimisticWorkers };
};
