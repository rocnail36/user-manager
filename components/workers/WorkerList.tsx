"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Worker, CompleteWorker } from "@/lib/db/schema/workers";
import Modal from "@/components/shared/Modal";

import { useOptimisticWorkers } from "@/app/(app)/workers/useOptimisticWorkers";
import { Button } from "@/components/ui/button";
import WorkerForm from "./WorkerForm";
import { PlusIcon } from "lucide-react";
import { columns } from "./DataTables/dataTables";
import { DataTable } from "./DataTables/columns";


type TOpenModal = (worker?: Worker) => void;

export default function WorkerList({
  workers,
   
}: {
  workers: CompleteWorker[];
   
}) {
  const { optimisticWorkers, addOptimisticWorker } = useOptimisticWorkers(
    workers,
     
  );
  const [open, setOpen] = useState(false);
  const [activeWorker, setActiveWorker] = useState<Worker | null>(null);
  const openModal = (worker?: Worker) => {
    setOpen(true);
    worker ? setActiveWorker(worker) : setActiveWorker(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeWorker ? "Edit Worker" : "Create Worker"}
      >
        <WorkerForm
          worker={activeWorker}
          addOptimistic={addOptimisticWorker}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticWorkers.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={optimisticWorkers} />
      </div>
      )}
    </div>
  );
}



const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No workers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new worker.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Workers </Button>
      </div>
    </div>
  );
};
