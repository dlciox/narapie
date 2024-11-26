import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import PostCard from "../components/posts/PostCard";
import apiService from "../utils/api";

const MainPage = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiService.getPosts();
        console.log('Fetched posts:', response.data);
        const sortedPosts = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setLatestPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <main className="mx-auto max-w-5xl py-4 px-4">
        {/* Navigation Cards */}
        <div className="rounded-lg border border-red-800 p-6 mb-6">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Witaj na NaRapie
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/mainstream">
              <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900 hover:bg-neutral-900 transition-colors h-48 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                  Polski Mainstream
                </h2>
                <p className="text-gray-300">
                  Sprawdź co słychać w mainstreamowym rapie.
                </p>
              </div>
            </Link>
            <Link to="/underground">
              <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900 hover:bg-neutral-900 transition-colors h-48 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                  Polski Underground
                </h2>
                <p className="text-gray-300">
                  Zobacz co dzieje się w podziemiu.
                </p>
              </div>
            </Link>
            <Link to="/concerts">
              <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900 hover:bg-neutral-900 transition-colors h-48 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-red-500 mb-4">
                  Koncerty
                </h2>
                <p className="text-gray-300">Sprawdź nadchodzące koncerty.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Latest Posts */}
        <div className="rounded-lg border border-red-800 p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Najnowsze Posty
          </h2>
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
              {latestPosts.length === 0 && (
                <div className="text-white col-span-3 text-center">No posts found.</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
