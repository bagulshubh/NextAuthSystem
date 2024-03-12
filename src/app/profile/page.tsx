"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage(){

    const router = useRouter();
    const [data,setData] = useState("nothing");

    const logout = async () => {
        try{
            const response = await axios.get("/api/users/logout");
            console.log(response);
            router.push("/login")
        } catch(err:any){
            console.log(err)
        }
    }

    const getUserDetails = async()=>{
        const res = await axios.get("/api/users/me")
        console.log(res)
        setData(res.data.user._id);
    }

    return (
        <div className="w-full flex flex-col items-center">
            This is user profile
            <h2>{data === 'nothing' ? "Nothing" : 
            <Link href={`/profile/${data}`}>Click</Link>} </h2>
            <button onClick={getUserDetails} className="btn btn-accent">Profile</button>
            <button className="bg-blue-500 mt-4 text-white font-bold py-2 px-4 rounded" onClick={logout}>LogOut</button>
        </div>
    )
}