import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    //likeCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    createdAt: { type: Date, default: new Date() }
});

export default mongoose.model('PostMessage', postSchema);