import React from 'react'

const layout = ({children,modal}:{children:React.ReactNode,modal:React.ReactNode}) => {
  return (
    <div>{
    children}
    {modal}</div>
  )
}

export default layout