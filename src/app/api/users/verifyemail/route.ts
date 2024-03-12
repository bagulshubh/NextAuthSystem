import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(reqeust:NextRequest) {
    try{

        const reqBody = await reqeust.json();
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne( { verifyToken : token, verifyTokenExpiry : {$gt:Date.now()} });

        if(!user){
            return NextResponse.json({
                message:"User does not exists"
            },{status:400})
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        console.log(user)
        return NextResponse.json({
            message:"Email verified",
            success:true
        },{status:200})


    } catch(err:any){
        return NextResponse.json({
            error:err.message
        },{status:500})
    }
}

