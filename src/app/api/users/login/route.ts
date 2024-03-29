import {connect} from  '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs  from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try{

        const reqBody = await request.json();
        const {email , password} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        //check if the password is correct

        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({
                message:"Password is wrong"
            },{status:400})
        }
        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json(
            {message:"Login Successfull",success:true},
            {status:200}
        )
        //setting cookies
        response.cookies.set("tokon",token,{
            httpOnly:true
        })

        return response;

    } catch(err:any){
        return NextResponse.json({error:err.message},
            {status:500})
    }
}
