import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import apiService from '../../utils/api';

function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    { value: 'mainstream', label: 'Polski Mainstream' },
    { value: 'underground', label: 'Polski Underground' },
    { value: 'international', label: 'Zagranica' },
    { value: 'concerts', label: 'Koncerty' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!post.category) {
      setError('Please select a category');
      return;
    }

    try {
      console.log('Submitting post:', post);
      const response = await apiService.createPost({
        ...post,
        category: post.category.trim()
      });
      console.log('Post created:', response);
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNav />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900">
          <h1 className="text-2xl font-bold text-white mb-6">Create New Post</h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Category</label>
              <select
                value={post.category}
                onChange={(e) => {
                  console.log('Selected category:', e.target.value);
                  setPost({ ...post, category: e.target.value });
                }}
                className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Image URL</label>
              <input
                type="url"
                value={post.imageUrl}
                onChange={(e) => setPost({ ...post, imageUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Content</label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600 min-h-[200px]"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Create Post
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="flex-1 bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
