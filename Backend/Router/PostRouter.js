import { Router } from "express";
import upload from "../Middleware/Multer.js";
import Authmiddleware from "../Middleware/UserMiddleware.js";
import { CreatePost, Allposts, Myposts, Updatepost, DeletePost } from "../Controller/PostController.js";

const postrouter = Router();

postrouter.post('/createpost', upload.single('poster'), Authmiddleware, CreatePost)
postrouter.get('/allpost', Allposts)
postrouter.get('/mypost', Authmiddleware, Myposts)
postrouter.put('/updatepost', upload.single('poster'), Authmiddleware, Updatepost)
postrouter.delete('/deletepost/:postid', Authmiddleware, DeletePost)


export default postrouter;
