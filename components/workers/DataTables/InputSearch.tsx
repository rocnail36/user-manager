"use client"
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useState } from "react";
import { LanguageContext } from "@/app/dictionaries/LanguageProvider";

interface InputProps<TData> {
  table: Table<TData>;
}

type Field = "name"  | "address" | "salary" | "ci" 

export default function InputSearch<TData>({ table }: InputProps<TData>) {

    

   const [field, setField] = useState<Field>("name") 
   const {d} = useContext(LanguageContext)
   const HandleChange = (e:string) => {
       table.getColumn(field)?.setFilterValue("")
       setField(e as Field)
   }

  return (
    <div className="flex gap-2">
      <Input
        placeholder={`${d?.workers.inputSeach.inputPlaceHolder} ${d?.workers.fields[field]}`}
        value={(table.getColumn(field)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(field)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select onValueChange={HandleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={d?.workers.inputSeach.selectPlaceHolder}/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">{d?.workers.modal.inputName.title}</SelectItem>
          <SelectItem value="address">{d?.workers.modal.inputAddress.title}</SelectItem>
          <SelectItem value="ci">{d?.workers.modal.inputCi.title}</SelectItem>
          <SelectItem value="salary">{d?.workers.modal.inputSalary.title}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
