"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Worker, CompleteWorker } from "@/lib/db/schema/workers";
import Modal from "@/components/shared/Modal";

import { useOptimisticWorkers } from "@/app/[lang]/(app)/workers/useOptimisticWorkers";
import { Button } from "@/components/ui/button";
import WorkerForm from "./WorkerForm";
import { PlusIcon } from "lucide-react";
import { columnsAllWorkers } from "./DataTables/dataTables";
import { DataTable } from "./DataTables/columns";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";


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
  const {d} = useContext(LanguageContext)
  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeWorker ? d?.workers.modal.titleUpdate : d?.workers.modal.titleCreate}
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
        <DataTable columns={columnsAllWorkers(d!)} data={optimisticWorkers} className="min-h-[80vh]"/>
      </div>
      )}
    </div>
  );
}



const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  const {d} = useContext(LanguageContext)
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        {d?.workers.emptyState.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {d?.workers.emptyState.text}
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> {d?.workers.emptyState.button} </Button>
      </div>
    </div>
  );
};
