import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import apiService from '../../utils/api';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiService.getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      console.log('Deleting post:', id); // Debug log
      await apiService.deletePost(id);
      console.log('Post deleted successfully'); // Debug log
      // Refresh the posts list after deletion
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNav />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Posts Dashboard</h1>
            <Link 
              to="/admin/posts/create"
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition-colors"
            >
              Create New Post
            </Link>
          </div>
          
          <div className="space-y-4">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="bg-neutral-800 rounded-lg p-4 border border-red-900"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-2">Category: {post.category}</p>
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-48 h-48 object-cover rounded-md mb-4"
                  />
                )}
                <div className="flex space-x-4">
                  <Link 
                    to={`/admin/posts/edit/${post._id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(post._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-white text-center">No posts found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsList;