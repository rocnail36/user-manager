import { getSalaryTendencyByDays, getWorkersBestSalary, GetWorkerAvgSalary} from '@/lib/api/workers/queries'
import { getUserAuth } from '@/lib/auth/utils'
import { getSession } from 'next-auth/react'
import React from 'react'
export const dynamic = 'force-dynamic'

const page = async() => {

  const promise1 = getSalaryTendencyByDays()
  const promise2 = getWorkersBestSalary()
  const promise3 = GetWorkerAvgSalary()
   
  const [salaryTendency,BestWorkerSalary,SalaryAvg] = await Promise.all([promise1,promise2,promise3])
  
  return (
    <div className='fixed aspect-video min-h-[500px] w-[500px] bg-red-400 rounded-xl  top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]'>

     
    
      
    </div>
  )
}

export default page