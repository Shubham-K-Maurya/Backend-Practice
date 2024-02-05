// require ('dotenv').config({path:'./env'})   // completely run
//
import dotenv from "dotenv"     // improved version of dotenv because it uses es6 module 
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({
    path:'/env'
})



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 6000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("MongoDB connection Failed !!! ", error)
})

















// 1st approach
/*
import express from "express"

const app=express()

// first approach to define function
// function connectDB(){}
// connectDB()


// second approach to define function
// it is ifi in javascript // ; is used to clean out the code
;( async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("Error Occured: ", error)
        throw error
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })

    }catch(error){
        console.error()
        console.error("Error: ", error)  // to show the error
        throw error
    }

})()
*/