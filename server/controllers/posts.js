import mongoose from 'mongoose';
import PostMessage from './../models/postMessage';

export const getPost = async (req, res)=>{
    const { id } = req.params;
    try{
        const post = await PostMessage.findById(id);
        if(post){
            return res.status(200).json({ message: "Ok", post });
        }
        res.status(404).json({ message: "There is no post" });
    }catch(e){
        res.status(404).json({ message: e.message });
    }
}

export const getPosts = async (req, res)=>{
    const { page } = req.query;
    try{
        //Calculate numbers of posts per page
        const LIMIT = 8;//Limit of posts on a page
        //Calculate the starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT;
        //Count all the documents (Posts)
        const totalPosts = await PostMessage.countDocuments({});
        // sort({ _id: -1 }) - From the newest to the oldest, this gives us the newest first
        const postMessages = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        //console.log('All messages ', postMessages);
        res.status(200).json({ 
            data: postMessages,
            currentPage: Number(page),
            numberOfPages: Math.ceil(totalPosts / LIMIT) 
        });
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

// QUERY   /posts?page=1  it means page = 1  req.query.page = 1
// PARAMS  /posts/:id  If  /posts/1  it means  req.params.id = 1      
export const getPostBySearch = async (req, res)=>{
    const { searchQuery, tags } = req.query;
    try{ 
        const title = new RegExp(searchQuery, 'i');
        //Find all the Posts that matched one of those two criteria
        // $or - means one from the array
        // $in - operator takes an array as its value. {"breed" : { $in : ["Pitbull", "Great Dane", "Pug"]}}
        const posts = await PostMessage.find({ $or: [
            { title },
            { tags: { $in: tags.split(',') } }
        ] });
        res.status(200).json({ data: posts });
    }catch(e){
        res.status(404).json({ message: e.message });
    }
};

export const addComment = async (req, res)=>{
    const { id } = req.params;
    const { comment } = req.body;
    try{
        const post = await PostMessage.findById(id);
        if(post){
            post.comments.push(comment);
            const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
            return res.status(201).json({ message: "Comment created", updatedPost });
        }
        res.status(404).json({ message: e.message });
    }catch(e){
        res.status(404).json({ message: e.message });
    }
}