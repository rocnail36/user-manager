import { db } from "@/lib/db";
import { User } from "@prisma/client";


export const validateEmail = async(Userid:string):Promise<[string?,User?]> => {
 
     try {
        const result = await  db.user.update({
            where:{
                id: Userid
            },
            data:{
                emailVerified: new Date()
            }
        })

        return [undefined,result]

     } catch (error) {
        return ["usuario no encontrado"]
     }
   
}