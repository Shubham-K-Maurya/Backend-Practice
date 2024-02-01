import mongoose, { Schema } from "mongoose";

//after reading bcrypt and jwt then come here and include
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
//now direct encryption is not possible so we use hooks 1) pre hook : Pre middleware functions are executed one after another, when each middleware calls next.

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true          //if any thing wants to serachable in an optimized manner then index should true so that it comes in database searching
        },
        email: {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,

            }
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        avtar: {
            type: String,  // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory: [    // this make very complex so we use mongoose-aggregate-paginate which allows aggregation queries link: https://www.npmjs.com/package/mongoose-aggregate-paginate-v2?activeTab=readme and see aggregation pipeline link: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/ which allows complex queries
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is  required']
        },
        refrehToken: {
            type: String
        }


    },
    {
        timestamps: true
    }


)


//use bcrypt or bcrypt.js uses for hashing our password link : https://www.npmjs.com/package/bcrypt i.e, A library to help you hash passwords.

//tokens : use jwt stands for json web tokens -> to see the tokens use jwt.io (it makes by cryptographc algorithm which includes headers: auto injects, payloads(fancy name for data): main role and verification signature which kept secrets)


//both used in cryptography and both of them are used necessarily


//using hooks
//https://mongoosejs.com/docs/middleware.html#pre

//logic for encrypting password
UserSchema.pre("save", async function (next) {
    if(this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})


//mongoose also provides methods to update and can also design custom methods

UserSchema.methods.isPasswordCorrect=async function(password){
    // logic for password checking

    return await bcrypt.compare(password, this.password)            //results in true or false
}


//jwt is a bearer token(i.e, that can bear) has strong security link:https://github.com/auth0/node-jsonwebtoken#readme
//now go to .env variable


//to access tokens

UserSchema.methods.generateAccessToken=function(){
    return jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", UserSchema)