import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest , NextResponse } from "next/server";
import  User from "@/models/userModel"
import {connect} from "@/dbConfig/dbConfig"

connect();

export  async function GET(request:NextRequest) {
    try{
        const id = await getDataFromToken(request);
        const user = await User.findById(id).select("-password");
        return NextResponse.json({
            message:"User Fetched",
            success:true,
            user
        },{status:200})
    } catch(err:any){
        return NextResponse.json({error:err.message},{status:400})
    }
}