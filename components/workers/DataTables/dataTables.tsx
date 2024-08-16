"use client"

import { ColumnDef } from "@tanstack/react-table"

import { type Worker, CompleteWorker } from "@/lib/db/schema/workers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<CompleteWorker>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "adress",
    header: "Adress",
  },
  {
    accessorKey:"ci",
    header:"C.I"
  },
  {
    accessorKey: "salary",
    header:"Salary"
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
  }
]
