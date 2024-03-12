import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request:NextRequest) => {
    try{
        const encodedToken = request.cookies.get('tokon')?.value || '';
        const decodedToken : any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch(err:any){
        throw new Error(err.message)
    }
}
