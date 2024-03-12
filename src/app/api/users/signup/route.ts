import {connect} from  '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs  from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';


connect()


export async function POST (request:NextRequest){
    try{

        const reqBody = await request.json()
        const {username, email ,password} = reqBody;

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already Exists"},{status :409})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt);

         const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser)

        //send verification email
        await sendEmail({email, emailType: "VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:'User Created Successfully',
            user:savedUser,
            success:true  
        },{status:201})

    } catch(err:any){
        return NextResponse.json({
            error:err.message},
            {status:500}
        ) 
    }
}
