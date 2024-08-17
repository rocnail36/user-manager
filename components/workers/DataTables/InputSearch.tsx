import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface InputProps<TData> {
  table: Table<TData>;
}

export default function InputSearch<TData>({ table }: InputProps<TData>) {


   const [fiel, setField] = useState("name") 

   const HandleChange = (e:string) => {
       setField(e)
   }

  return (
    <div className="flex gap-2">
      <Input
        placeholder={`Filter ${fiel[0].toUpperCase() + fiel.slice(1)}...`}
        value={(table.getColumn(fiel)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(fiel)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select onValueChange={HandleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select field" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="adress">Adress</SelectItem>
          <SelectItem value="ci">C.I</SelectItem>
          <SelectItem value="salary">Salary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
