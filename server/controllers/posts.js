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