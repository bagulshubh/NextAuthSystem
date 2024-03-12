'use client';
import React, { useState } from "react";
import {useRouter} from "next/navigation"
import axios from "axios"
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const [loading,setloading] = useState(false);

    const onLogin = async()=>{
        //something to do when login
        try{
            setloading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response);
            router.push("/profile")
        } catch(err){
            console.log(err)
        }finally{
            setloading(false)
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
    <div className="hero min-h-screen bg-base-200">
        {
            loading ? <span className="loading loading-ring loading-lg"></span> :
        
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" required onChange={changeHandler} name="email" value={user.email} />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required value={user.password} onChange={changeHandler} name="password"/>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover" onClick={()=>{router.push("/signup")}}>SignUp</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={onLogin}>Login</button>
                    </div>
                </form>
                </div>
            </div>
    }
</div>
  )
}

export default Login
