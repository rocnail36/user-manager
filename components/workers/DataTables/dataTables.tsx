"use client"

import { ColumnDef, ColumnFilter, ColumnFiltersOptions, FilterFn, Row } from "@tanstack/react-table"

import { type Worker, CompleteWorker } from "@/lib/db/schema/workers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const filterFn = (row:Row<Worker>,columnId:string,filterValue:string) => {
  const search = filterValue.toLowerCase();
  let value = row.getValue(columnId) as string;
  if (typeof value === "number") value = String(value);
  return value?.toLowerCase().includes(search);
}


export const columns: ColumnDef<CompleteWorker>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "adress",
    header: "Adress",
  },
  {
    accessorKey:"ci",
    header:"C.I",
    filterFn
  },
  {
    accessorKey:"phoneNumber",

  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Salary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({row}) => {
        const salary = row.getValue("salary")
        const basePath = usePathname()
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
    header:  () => <div>Edit User</div>,
    cell: ({row}) => {
        const id = row.getValue("id")
        const basePath = usePathname()
        return (
        <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + id }>
          Edit
        </Link>
      </Button>
        )
    }
  },
  
]

