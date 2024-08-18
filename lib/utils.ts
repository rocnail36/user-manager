import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};



export type Action = "create" | "update" | "delete";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};



export function obtenerUltimos7Dias(salaryTendency:{[key:string]:number}) {
    
  const salaryTendencyToarray = Object.entries(salaryTendency)
  console.log(salaryTendencyToarray)
  const chartData: { day: string; salary: number }[] = [];
  const nombresDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const hoy = new Date();

  for (let i = 0; i < 7; i++) {
    
    const dia = new Date(hoy);
    dia.setDate(hoy.getDate() - i);
    const nombreDia = nombresDias[dia.getDay()];
    chartData.push({ day: nombreDia, salary: salaryTendencyToarray[i] ? salaryTendencyToarray[i][1] : 0});
  }

  return chartData;
}