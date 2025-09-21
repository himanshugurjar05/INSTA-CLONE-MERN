import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type:String, 
    },
    poster:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel;