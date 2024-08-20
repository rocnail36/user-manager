"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { type Worker, CompleteWorker } from "@/lib/db/schema/workers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Dictionary } from "@/app/dictionaries/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const filterFn = (row:Row<Worker>,columnId:string,filterValue:string) => {
  const search = filterValue.toLowerCase();
  let value = row.getValue(columnId) as string;
  if (typeof value === "number") value = String(value);
  return value?.toLowerCase().includes(search);
}



 
 
 


export const columnsAllWorkers = (d:Dictionary) => {
  const dModal = d.workers.modal
  const columns: ColumnDef<CompleteWorker>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {dModal.inputName.title}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
    {
      accessorKey: "address",
      header: d.workers.modal.inputAddress.title,
    },
    {
      accessorKey:"ci",
      header: dModal.inputCi.title,
      filterFn
    },
    {
      accessorKey:"phoneNumber",
      header: dModal.inputPhoneNumber.title
    },
    {
      accessorKey: "salary",
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {dModal.inputSalary.title}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({row}) => {
          const salary = row.getValue("salary")
        
          return (
          <div className="p-4 align-middle [&:has([role=checkbox])]:pr-0" >
          
            {salary as number}
          
        </div>
          )
      },
     filterFn
    },
    {
      accessorKey: "id",
      header:  () => <div>{d.workers.modal.inputEdit.title}</div>,
      cell: ({row}) => {
          const id = row.getValue("id")
          
          return (
          <Button variant={"link"} asChild>
          <Link href={ "workers" + "/" + id }>
            Edit
          </Link>
        </Button>
          )
      }
    },
    
  ]

  return columns

}




