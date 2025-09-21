import PostModel from "../Models/PostModel.js"; 

// CREATE POST
export const CreatePost = async (req, res) => {
    try {
        const { title } = req.body;
        const poster = req.file?.path;
        const userid = req.user._id;

        if (!title || !poster) {
            return res.status(400).json({ message: "Title and poster are required" });
        }

        const post = new PostModel({
            title,
            poster,
            user: userid
        });

        await post.save();

        return res.status(201).json({
            message: "Post Created Successfully",
            post
        });

    } catch (err) {
        console.error("CreatePost Error:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

//  GET ALL POSTS
export const Allposts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user", "name email photo");

        return res.status(200).json({
            message: "Fetched All Posts",
            posts
        });

    } catch (err) {
        console.error("Allposts Error:", err);
        return res.status(500).json({ message: "Something went wrong..." });
    }
};

// My Posts
export const Myposts = async (req, res) => {
    try {
        const userid = req.user._id;

        const posts = await PostModel.find({ user: userid })
            .populate("user", "name email photo");

        return res.status(200).json({
            message: "Fetched Your Posts",
            posts,
        });
    } catch (err) {
        console.error("MyPosts Error:", err);
        return res.status(500).json({ message: "Something Went Wrong.." });
    }
};

// Updated Post
export const Updatepost = async (req, res) => 
{
    try
    {
        const {title, postid} = req.body;
        const poster = req.file?.path;
        const userid = req.user._id;

        const post = await PostModel.findOne({_id:postid, user:userid })

        if(!post)
        {
            return res.status(404).json("Post Not Found or unauthorized..")
        }

        if(title) post.title = title;
        if(poster) post.poster = poster;

        await post.save();

        return res.status(200).json("Post Updated Successfully...")
    }
    catch(err)
    {
        console.error(err)
        return res.status(500).json("SOmething Went Wrong..")
    }
}

// Delete Post
export const DeletePost = async (req, res) => 
{
    try
    {
        const {postid} = req.params;
        const userid = req.body;

        const post = await PostModel.findOne({_id:postid, user:userid})

        if(!post)
        {
            return res.status(404).json("Post not Found or unauthorized.")
        }

        await PostModel.findByIdAndDelete(postid)

        return res.status(200).json("Post Deleted Successfully..")

    }
    catch(err)
    {
        console.error(err)
        return res.status(500).json("Something Went Wrong....")
    }
}