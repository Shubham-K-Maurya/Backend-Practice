import mongoose,{Schema} from "mongoose";
//using mongooseAggregatePaginate //1st step
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema(
    {
        videoFile:{
            type:String ,//cloudinary url
            required: true
        },
        thumbnail: {
            type: String,//cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        descriptions: {
            type: String,
            required: true
        },
        duration: {
            type: Number,  //comes from cloudinary url
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)


//2md step  read from here link : https://mongoosejs.com/docs/middleware.html and also proides our own plugin
videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video", videoSchema)