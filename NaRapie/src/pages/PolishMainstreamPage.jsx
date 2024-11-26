import { useState, useEffect } from 'react';
import apiService from '../utils/api';
import Navbar from "../components/layout/Navbar";
import PostCard from "../components/posts/PostCard";

const PolishMainstreamPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await apiService.getPosts();
        console.log('API Response:', response);
        const allPosts = response.data;
        console.log('All posts:', allPosts);
        
        // Store debug info
        setDebugInfo({
          totalPosts: allPosts.length,
          categories: [...new Set(allPosts.map(post => post.category))],
          postCategories: allPosts.map(post => post.category)
        });
        
        const mainstreamPosts = allPosts
          .filter(post => {
            console.log(`Post ${post._id} category:`, post.category);
            return post.category === 'mainstream';
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('Filtered mainstream posts:', mainstreamPosts);
        setPosts(mainstreamPosts);
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response,
          stack: error.stack
        });
        setError(error.response?.data?.message || error.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <main className="mx-auto max-w-3xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold mb-6 text-white">
            Polski Mainstream
          </h1>
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostCard key={post._id} post={post} index={index} />
                ))
              ) : (
                <div className="text-white text-center">
                  No posts found in Mainstream category. Total posts: {posts.length}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PolishMainstreamPage;
