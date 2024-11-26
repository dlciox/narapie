import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import apiService from '../../utils/api';
import Navbar from '../layout/Navbar';
import PostCard from '../posts/PostCard';

function UserProfile() {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    try {
      console.log('Fetching liked posts...');
      const response = await apiService.getLikedPosts();
      console.log('Liked posts response:', response.data);
      setLikedPosts(response.data);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
      setError('Failed to fetch liked posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await apiService.deleteAccount();
      logout();
      navigate('/');
    } catch (error) {
      setError('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900 mb-6">
          <h1 className="text-2xl font-bold text-white mb-6">User Profile</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Username</label>
              <p className="text-white">{user.username}</p>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Account Type</label>
              <p className="text-white capitalize">{user.role}</p>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Member Since</label>
              <p className="text-white">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-6 space-y-4">
              <button
                onClick={logout}
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full py-2 px-4 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors"
                disabled={loading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900">
          <h2 className="text-xl font-bold text-white mb-6">Liked Posts</h2>
          {loading ? (
            <div className="text-white text-center">Loading liked posts...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="space-y-6">
              {likedPosts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
              {likedPosts.length === 0 && (
                <p className="text-gray-400 text-center">No liked posts yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile; 