import {hash} from "bcrypt"


export const hashData = async(password:string) => {
   

      
   return await hash(password,10)

   

}