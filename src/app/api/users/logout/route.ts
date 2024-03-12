import { NextResponse } from "next/server";

export async function GET (){
    try{

        const response = NextResponse.json(
            {
                message:"Logout Successfully",
                success:true
            }
        )

        response.cookies.set("tokon","",{httpOnly:true,expires:new Date(0)});

        return response;

    } catch(err:any){
        return NextResponse.json({
            message:err.message
        },{status:500})
    }
}