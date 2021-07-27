import express from 'express';
import { 
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostBySearch
} from './../controllers/posts';

import auth from './../middleware/auth';

const router = express.Router();

// http://localhost:5000/posts
router.get('/', getPosts);
// http://localhost:5000/posts
router.post('/', auth, createPost);
// http://localhost:5000/posts/12
router.patch('/:id', auth, updatePost);
// http://localhost:5000/posts/12
router.delete('/:id', auth, deletePost);
// http://localhost:5000/posts/12/likePost
router.patch('/:id/likePost', auth, likePost);
// // http://localhost:5000/posts/search?searchQuery=val1&tags=val2
router.get('/search', getPostBySearch);

export default router;