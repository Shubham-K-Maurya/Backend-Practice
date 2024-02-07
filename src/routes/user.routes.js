import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

//importing upload from multer middleware
import {upload} from "../middlewares/multer.middleware.js"   //means execute in between them


const router=Router()


// router.route("/register").post(upload.fields(registerUser)   // adding multer of upload before register user
router.route("/register").post(
    upload.fields([
        {
        name:"avtar",
        maxCount:1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)




export default router