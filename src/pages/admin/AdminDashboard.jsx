import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../../components/Admin/AdminNav';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    categories: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const posts = response.data;
        const categories = [...new Set(posts.map(post => post.category))];
        
        setStats({
          totalPosts: posts.length,
          categories: categories
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNav />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900">
          <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-neutral-800 p-6 rounded-lg border border-red-900">
              <h3 className="text-lg font-semibold text-white mb-2">Total Posts</h3>
              <p className="text-2xl text-red-500">{stats.totalPosts}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/admin/posts/create" 
              className="bg-neutral-800 p-6 rounded-lg border border-red-900 hover:bg-neutral-700 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Create New Post</h3>
              <p className="text-gray-400">Add a new post to your blog</p>
            </Link>
            <Link 
              to="/admin/posts" 
              className="bg-neutral-800 p-6 rounded-lg border border-red-900 hover:bg-neutral-700 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Manage Posts</h3>
              <p className="text-gray-400">Edit or delete existing posts</p>
            </Link>
          </div>

          {/* Categories */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {stats.categories.map(category => (
                <span 
                  key={category}
                  className="px-3 py-1 bg-neutral-800 text-white rounded-full border border-red-900"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;