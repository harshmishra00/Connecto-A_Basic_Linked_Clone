import express from 'express';
import { createPost, getPosts, likePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();


router.get('/', getPosts); 
router.post('/', protect, upload.single('image'), createPost); 
router.put('/like/:postId', protect, likePost); 

export default router;
