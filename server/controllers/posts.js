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
    const newPost = new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(e){
        //The HTTP 409 Conflict response status code indicates a request conflict with current state of the target resource
        res.status(409).json({ message: e.message });
    }
    res.send('Post creation');
}