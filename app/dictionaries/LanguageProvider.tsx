"use client"
import { createContext, useEffect, useState } from "react";
import {  Locale } from "./dictionaries";
import { Dictionary } from "./types";


export const LanguageContext = createContext<{d:Dictionary | undefined}>({} as {d:Dictionary})


export const LanguageProvider = ({children,lang:d}:{children:React.ReactNode,lang:Dictionary}) => {

   

return(
    <LanguageContext.Provider  
    value={{d}}>
            {children}
    </LanguageContext.Provider>
)


}






