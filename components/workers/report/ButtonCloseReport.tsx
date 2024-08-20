"use client"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import React from 'react'

const ButtonCloseReport = () => {
    const router = useRouter()
  return (
    <X className="absolute top-8 right-8 cursor-pointer" onClick={() => router.back()} /> 
  )
}

export default ButtonCloseReport