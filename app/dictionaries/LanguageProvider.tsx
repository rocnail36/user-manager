"use client"
import { createContext, useEffect, useState } from "react";
import {  Locale } from "./dictionaries";
import { Dictionary } from "./types";


export const LanguageContext = createContext<{lang:Dictionary | undefined}>({} as {lang:Dictionary})


export const LanguageProvider = ({children,lang}:{children:React.ReactNode,lang:Dictionary}) => {

   

return(
    <LanguageContext.Provider  
    value={{lang}}>
            {children}
    </LanguageContext.Provider>
)


}






