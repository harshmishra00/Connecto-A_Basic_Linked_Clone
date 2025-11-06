import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: [true, 'Post content is required'],
            trim: true,
        },
        imageUrl: {
            type: String,
            default: null,
        },
        likes: {
            type: Number,
            default: 0,
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, 
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
