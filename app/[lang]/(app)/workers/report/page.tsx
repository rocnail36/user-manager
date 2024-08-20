import Loading from '@/app/[lang]/loading'
import { getDictionary, Locale } from '@/app/dictionaries/dictionaries'
import { Dictionary } from '@/app/dictionaries/types'
import GeneratePdf from '@/components/pdf/GeneratePdf'
import { Report } from '@/components/workers/report/Report'
import React, { Suspense } from 'react'


const page = async({params}:{params:{lang:Locale}}) => {

  
  const d = await getDictionary(params.lang)
  

  return (
    <div>
      <GeneratePdf imgSize={[20, 10, 200, 200]}>
      <Suspense fallback={<Loading/>} >
      <Report d={d as Dictionary}/>
      </Suspense>

      </GeneratePdf>
    </div>
  )
}

export default page