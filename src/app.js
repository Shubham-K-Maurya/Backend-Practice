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









export {app}