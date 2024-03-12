'use client';
import React, { useState } from "react";
import {useRouter} from "next/navigation"
import axios from "axios"
import Link from "next/link";

const Signup = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:""
    })
    
    const [loading,setloading] = useState(false);

    const onSignup = async()=>{
        //something to do when signup
        try{
            setloading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup Successfull",response.data);
            router.push("/login")
        } catch(err){
            console.log("Signup Failed")
            console.log(err)
        } finally{
            setloading(false);
        }
    }

    const changeHandler = (event:any)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        console.log(user)
    }

  return (
    <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-center">{loading ? "Loading..." : "SignUp"}</h1>
        <label htmlFor="username">username</label>
        <input id="username" type="text" value={user.username} onChange={changeHandler} name="username" placeholder="UserName" className="p-1 text-black"></input>

        <label htmlFor="email">email</label>
        <input id="email" type="text" value={user.email} onChange={changeHandler} name="email" placeholder="Email" className="p-1 text-black"></input>

        <label htmlFor="password">password</label>
        <input id="password" type="password" value={user.password} onChange={changeHandler} name="password" placeholder="Password" className="p-1 text-black"></input>

        <button onClick={onSignup}>SignUp</button>

        <Link href="/login">Visit Login Page</Link>
       
    </div>
  )
}

export default Signup
