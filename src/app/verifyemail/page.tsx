"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const VerifyEmail = () => {
    
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const router = useRouter();

    const verifyUserEmail = async() =>{
        try{
            const res = await axios.post("/api/users/verifyemail",{token})
            setVerified(true);
            console.log(res)
            router.push("/")
        } catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        const urlToken : any = window.location.search.split("=");
        setToken(urlToken[1])
        console.log(urlToken[1])
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Verify Your Email</h1>
                <p className="py-6">{token ? <span>{token}</span>  : "No Token"}</p>
                <button className="btn btn-primary" onClick={()=>{router.push("/")}}>Cancel</button>
            </div>
            </div>
      </div>
  )
}

export default VerifyEmail
