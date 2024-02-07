import { asyncHandler } from "../utils/asyncHandler.js";

// importing api error
import { ApiError } from "../utils/apiError.js";

//importing user
import { User } from "../models/user.model.js";

//importing cloudinary
import {uploadOnCloudinary} from "../utils/cloudinary.js"

//importing ApiResponse
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
   //STEPS FOR LOGIC BUILDING
   //1) get user details from frontend

   //2) validation not empty

   //3) check if user already exists   (email or username)

   //4) check for images and avtar

   //5) upload them to cloudinary

   //6 check avatar successfully uploadd or not

   //7 create user obbject -> create entry in db

   //after creating so we can access the response

   //8 remove password and refresh token from field

   //9 check for user creation

   //10 return response

   const { fullname, email, username, password } = req.body;
   console.log("email: ", email);
   console.log("password: ", password);

   // if(fullname==="")
   //    throw new ApiError(400,"full name is required")

   if (
      [fullname, email, username, password].some((field) => field?.trim() === "")
   ) {
      throw new ApiError(400, "All fields are required");
   }

// User.findOne({email/username})
const existedUser = User.findOne({
   $or: [{ username }, { email }],
});
if (existedUser) {
   throw new ApiError(409, "User with email or username already Exists")
}


const avatarLocalPath=req.files?.avtar[0]?.path;

const coverImageLocalPath=req.files?.coverImage[0]?.path;


if(!avatarLocalPath){
   throw new ApiError(400,"Avatar  file is rrequired")
}


const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
   throw new ApiError(400, "Avatar  file is rrequired")
   
}


const user=awaitUser.create({
   fullname,
   avatar:avatar.url,
   // coverImage: coverImage.url 
   coverImage: coverImage?.url ||"",
   email,
   password,
   username: username.toLowerCase(),
})

const createdUser=await User.findById(user._id).select(
   "-password -refreshToken"
)

if (!createdUser) {
   throw new ApiError(500,"Something went wromg while registering user ")
   
}


return res.status(201).json(
   new ApiResponse(200, createdUser,"User Registered Successfully")
)

})
export { registerUser };
