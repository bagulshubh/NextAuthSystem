"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage(){

    const router = useRouter();

    const logout = async () => {
        try{
            const response = await axios.get("/api/users/logout");
            console.log(response);
            router.push("/login")
        } catch(err:any){
            console.log(err)
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            This is user profile
            <button className="bg-blue-500 mt-4 text-white font-bold py-2 px-4 rounded" onClick={logout}>LogOut</button>
        </div>
    )
}