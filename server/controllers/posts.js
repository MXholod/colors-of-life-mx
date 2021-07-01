import mongoose from 'mongoose';
import PostMessage from './../models/postMessage';

export const getPosts = async (req, res)=>{
    try{
        const postMessages = await PostMessage.find();
        //console.log('All messages ', postMessages);
        
        res.status(200).json(postMessages);
    }catch(e){
        res.status(404).json({ message: e.message });
    }
}

export const createPost = async (req, res)=>{
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(e){
        //The HTTP 409 Conflict response status code indicates a request conflict with current state of the target resource
        res.status(409).json({ message: e.message });
    }
}

export const updatePost = async (req, res)=>{
    const { id } = req.params;
    const post = req.body;
    //Checking 'id' is mongoose id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('There is no post');
    try{
        const {tags, creator, title, message, selectedFile} = post;
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {
            tags, creator, title, message, selectedFile, id
        }, { new : true });
        res.status(200).json(updatedPost);
    }catch(e){
        res.status(404).json({ message: e.message });
    }
};

export const deletePost = async (req, res)=>{
    const { id: _id } = req.params;
    //Checking '_id' is mongoose id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('There is no post');
    try{
        await PostMessage.findByIdAndRemove(_id);
        res.status(200).json({ message: "Post deleted successfully" });
    }catch(e){
        res.status(404).json({ message: e.message });
    }
};

export const likePost = async (req, res)=>{
    const { id: _id } = req.params;
    if(!req.userId) return res.status(401).json({ message: "Unathorized" });
    //Checking '_id' is mongoose id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('There is no post');
    try{
        const post = await PostMessage.findById(_id);
        //Check if user is already liked a post
        const index = post.likes.findIndex(id => id === String(req.userId));
        //If a person has not liked the post yet
        if(index === -1){
            post.likes.push(req.userId);
        }else{
            //Remove person's like
            post.likes = post.likes.filter(id => id !== String(req.userId));
        }
        //The 'post' beneath is instead of this - { likeCount: (post.likeCount + 1) }
        const postUpdated = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.status(200).json({ message: "Post updated successfully", postUpdated });
    }catch(e){
        res.status(404).json({ message: e.message });
    }
};