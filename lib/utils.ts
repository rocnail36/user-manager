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



export function convertSalaryToDays(salaryTendency:{[key:string]:number}) {
    
  const salaryTendencyToarray = Object.entries(salaryTendency)
  const chartData: { day: string; salary: number }[] = [];
  const nameDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const nombreDia = nameDays[day.getDay()];
    chartData.push({ day: nombreDia, salary: salaryTendencyToarray[i] ? salaryTendencyToarray[i][1] : 0});
  }

  return chartData;
}