import { Dictionary } from "@/app/dictionaries/types"
import { CompleteWorker } from "@/prisma/zod"
import { ColumnDef } from "@tanstack/react-table"

export function columnsWorkerReport(d:Dictionary)  {

      const dModal = d.workers.modal

    const columns : ColumnDef<CompleteWorker>[] = [
       {
         accessorKey: "name",
         header: dModal?.inputName.title
       },
       {
         accessorKey: "address",
         header: dModal.inputAddress.title,
       },
       {
         accessorKey:"ci",
         header:dModal.inputCi.title,
       },
       {
         accessorKey:"phoneNumber",
         header:dModal.inputPhoneNumber.title
       },
       {
         accessorKey: "salary",
         header: dModal.inputSalary.title
       },
     ]
   
     return columns
   }
   