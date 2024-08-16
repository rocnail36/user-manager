"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/workers/useOptimisticWorkers";
import { type Worker } from "@/lib/db/schema/workers";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import WorkerForm from "@/components/workers/WorkerForm";


export default function OptimisticWorker({ 
  worker,
   
}: { 
  worker: Worker; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Worker) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticWorker, setOptimisticWorker] = useOptimistic(worker);
  const updateWorker: TAddOptimistic = (input) =>
    setOptimisticWorker({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <WorkerForm
          worker={optimisticWorker}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateWorker}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticWorker.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticWorker.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticWorker, null, 2)}
      </pre>
    </div>
  );
}
