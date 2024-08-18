import Loading from '@/app/[lang]/loading'
import React, { Suspense } from 'react'

const layout = ({children,modal}:{children:React.ReactNode,modal:React.ReactNode}) => {
  return (
    <div>{
    children}
    <Suspense fallback={<Loading/>}>
    {modal}
    </Suspense>
    </div>
  )
}

export default layout