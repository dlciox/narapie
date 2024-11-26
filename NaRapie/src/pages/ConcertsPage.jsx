import { useState, useEffect } from 'react';
import apiService from '../utils/api';
import Navbar from "../components/layout/Navbar";
import PostCard from "../components/posts/PostCard";

const ConcertsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.getPosts();
        console.log('All posts:', response.data);
        
        const concertPosts = response.data
          .filter(post => post.category === 'concerts')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('Filtered concert posts:', concertPosts);
        setPosts(concertPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
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
          <h1 className="text-2xl font-bold mb-6 text-white">Koncerty</h1>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ConcertsPage;
