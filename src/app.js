import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
    
}))

app.use(express.json({limit:"16kb"}))   // forms in json takes from req.body i.e, through form

app.use(express.urlencoded({ extended: true, limit: "16kb" }))      //  takes data from url i.e, through url

app.use(express.static("public"))           //it store files and folder which can access anyone 


app.use(cookieParser())




//routes import
import userRouter from "./routes/user.routes.js"


//routes declaration
// app.get   //we use in app.js but here we segregate the code so we have to use app.use

// app.use("/users",userRouter) 
app.use("/api/v1/users",userRouter)        //standard practice we have to define api and its version
//here /usres is aprefix of    http;//localhost:8000/users
// standard practice =>   http;//localhost:8000/api/v1/users/register




export {app}