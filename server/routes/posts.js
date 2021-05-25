import express from 'express';
import { 
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
} from './../controllers/posts';

const router = express.Router();

// http://localhost:5000/posts
router.get('/', getPosts);
// http://localhost:5000/posts
router.post('/', createPost);
// http://localhost:5000/posts/12
router.patch('/:id', updatePost);
// http://localhost:5000/posts/12
router.delete('/:id', deletePost);
// http://localhost:5000/posts/12/likePost
router.patch('/:id/likePost', likePost);

export default router;