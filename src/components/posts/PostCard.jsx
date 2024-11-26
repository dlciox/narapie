import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import apiService from "../../utils/api";

const PostCard = ({ post, index, onLikeChange }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  useEffect(() => {
    if (user && post.likes) {
      setIsLiked(post.likes.includes(user.id));
    }
  }, [user, post.likes]);

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show login prompt
      return;
    }

    try {
      const response = await apiService.likePost(post._id);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      if (onLikeChange) {
        onLikeChange();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div
      className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900 post-animate post-hover"
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
    >
      {/* Post Header */}
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white font-bold">N</span>
        </div>
        <div className="ml-3">
          <p className="text-white font-semibold">{post.title}</p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-300 whitespace-pre-line">{post.content}</p>
      </div>

      {/* Like Button */}
      <div className="flex items-center justify-between border-t border-red-900/50 pt-4">
        <span className="text-gray-500">{likesCount} likes</span>
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
            isLiked
              ? "text-red-500 bg-red-900/10 hover:bg-red-900/20"
              : "text-gray-400 hover:bg-gray-800"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-300 ${
              isLiked ? "scale-110" : ""
            }`}
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
