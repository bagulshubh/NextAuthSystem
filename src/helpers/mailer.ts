import nodemailer  from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email,emailType,userId}:any)=>{
    try{
        console.log("userId is ",userId)
        
        const id = String(userId);
        const hasedToken = await bcryptjs.hash(id,10);
        console.log("HashedToken",hasedToken)
        
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hasedToken,
                verifyTokenExpiry:Date.now()+3600000
            },{new:true})
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hasedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            },{new:true})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3175ce51f6eedd",
              pass: "75189df689f5b0"
            }
        });

        const mailOptions = {
            from: 'shubhambagul5555100@gmail.com',
            to:email,
            subject: emailType === "VERIFY" ?  `Please Verify your Email` : `Reset Your Password`,
            html: `<p>Click  <a href="http://localhost:3000/verifyemail?token=${hasedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"} 
            or copy paste the link below in your browser.
            <br>http://localhost:3000/verifyemail?token=${hasedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse

    } catch(err:any){
        console.log("error in mailer",err)
        throw new Error(err.message)
    }
}

