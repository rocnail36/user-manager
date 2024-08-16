import {compare} from "bcrypt"


export const compareHashedData = async(data:string,hashedData:string) => {

    return await compare(data,hashedData)


}