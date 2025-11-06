import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { likePost } from '../api.js';
import { FaHeart} from 'react-icons/fa';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likingPosts, setLikingPosts] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/posts');
      if (response.data.success) {
        const sorted = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      }
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const handleLike = async (postId, currentLikes, currentLikedBy) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      alert('Please login to like posts');
      return;
    }
    if (likingPosts.has(postId)) return;
    const isLiked =
      currentLikedBy?.some(
        (id) =>
          id.toString() === userId ||
          (typeof id === 'object' && id._id?.toString() === userId)
      ) || false;
    setLikingPosts((prev) => new Set(prev).add(postId));
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy?.filter((id) => id.toString() !== userId)
                : [...(post.likedBy || []), userId],
            }
          : post
      )
    );
    try {
      const response = await likePost(postId);
      if (response.data.success) {
        setPosts((prev) =>
          prev.map((p) => (p._id === postId ? response.data.data : p))
        );
      }
    } catch (err) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: currentLikes, likedBy: currentLikedBy }
            : post
        )
      );
      alert('Failed to like post. Please try again.');
    } finally {
      setLikingPosts((prev) => {
        const updated = new Set(prev);
        updated.delete(postId);
        return updated;
      });
    }
  };

  const isPostLiked = (post) => {
    const userId = localStorage.getItem('userId');
    return (
      post.likedBy?.some(
        (id) =>
          id.toString() === userId ||
          (typeof id === 'object' && id._id?.toString() === userId)
      ) || false
    );
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    return `${backendUrl}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto p-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg mb-4">No posts yet</p>
        <button
          onClick={() => navigate('/create-post')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create your first post
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {posts.map((post) => {
        const imageUrl = getImageUrl(post.imageUrl);
        const isLiked = isPostLiked(post);
        const isLiking = likingPosts.has(post._id);

        return (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              {post.userImage ? (
                <img
                  src={post.userImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-base">{post.username}</h3>
                <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            {imageUrl && (
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imageUrl}
                  alt={`${post.username}'s post`}
                  className="w-full h-auto object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => handleLike(post._id, post.likes, post.likedBy)}
                disabled={isLiking}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform ${
                  isLiked
                    ? 'text-red-600 bg-red-50 hover:bg-red-100 scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaHeart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{post.likes || 0} {post.likes === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
