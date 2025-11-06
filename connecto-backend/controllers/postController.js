import Post from '../models/Post.js';


export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;


        if (!content || content.trim() === '') {

            if (req.file) {
                const fs = await import('fs');
                const path = await import('path');
                const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
                fs.unlinkSync(filePath);
            }
            return res.status(400).json({
                success: false,
                message: 'Post content is required',
            });
        }


        const post = await Post.create({
            user: req.userId,
            username: req.username,
            content: content.trim(),
            imageUrl: imageUrl,
        });

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error) {
        console.error('Create post error:', error);
        

        if (req.file) {
            try {
                const fs = await import('fs');
                const path = await import('path');
                const filePath = path.join(process.cwd(), 'uploads', req.file.filename);
                fs.unlinkSync(filePath);
            } catch (deleteError) {
                console.error('Error deleting file:', deleteError);
            }
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error while creating post',
        });
    }
};


export const getPosts = async (req, res) => {
    try {
        // Get all posts sorted by creation date (newest first)
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .select('-__v')
            .populate('likedBy', 'name email');

        res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: posts,
            count: posts.length,
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching posts',
        });
    }
};


export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;


        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }


        const isLiked = post.likedBy.includes(userId);

        if (isLiked) {

            post.likedBy = post.likedBy.filter(
                (id) => id.toString() !== userId.toString()
            );
            post.likes = Math.max(0, post.likes - 1);
        } else {

            post.likedBy.push(userId);
            post.likes = post.likes + 1;
        }

        await post.save();


        await post.populate('likedBy', 'name email');

        res.status(200).json({
            success: true,
            message: isLiked ? 'Post unliked' : 'Post liked',
            data: post,
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while liking post',
        });
    }
};
