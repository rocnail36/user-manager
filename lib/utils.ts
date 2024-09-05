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



export function convertSalaryToDays(salaryTendency: { [key: string]: {day:number,salary:number} }) {
 
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

  for(let i = 0;i < 7;i++){
    const date = new Date()
    
    date.setDate(date.getDate() - i)

    const today = date.getDay()
    const salaryTendencyDay = salaryTendency[today]
    if(salaryTendencyDay){
      chartData.push({day:nameDays[salaryTendencyDay.day],salary:salaryTendencyDay.salary})
    }else{
      chartData.push({day:nameDays[today],salary:0})
    }
  }

  
  return chartData;
}