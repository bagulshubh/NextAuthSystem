import mongoose, { connection } from "mongoose";


export async function connect () {
    try{
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("Mongodb connected")
        })

        connection.on( 'error', (err) => {
            console.log(err)
        })  

    }catch(err){
        console.log(err);

    }
}





