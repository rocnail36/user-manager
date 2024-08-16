import {hash} from "bcrypt"


export const hashData = async(password:string) => {

   const hashedData = await hash(password,10)

   return hashedData

}