import express from 'express';
import { getPosts, createPost } from './../controllers/posts';

const router = express.Router();

// http://localhost:5000/posts
router.get('/', getPosts);
// http://localhost:5000/posts
router.post('/', createPost);

export default router;