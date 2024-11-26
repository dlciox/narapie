import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Mock database - in a real app, this would come from your API
  const mockDatabase = [
    { id: 1, title: "Taco Hemingway - Polska Floryda", image: "https://placehold.co/150x150/black/red" },
    { id: 2, title: "Taco Hemingway - Cafe Belga", image: "https://placehold.co/150x150/black/red" },
    { id: 3, title: "Mata - Młody Matczak", image: "https://placehold.co/150x150/black/red" },
    { id: 4, title: "PRO8L3M - Art Brut 3", image: "https://placehold.co/150x150/black/red" },
    { id: 5, title: "Taco Hemingway & Quebonafide - Soma 0,5 mg", image: "https://placehold.co/150x150/black/red" },
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const searchTerms = searchQuery.toLowerCase().split(' ');
    
    return mockDatabase.filter(item => {
      const titleLower = item.title.toLowerCase();
      return searchTerms.every(term => titleLower.includes(term));
    });
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Szukaj..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full rounded-md bg-neutral-800 px-4 py-2 pl-10 pr-10 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-2.5 rounded-full p-0.5 text-gray-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearching && searchResults.length > 0 && (
        <div className="absolute right-0 mt-2 w-screen md:w-96 rounded-md bg-neutral-800 py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/search/${result.id}`}
                  className="group flex flex-col items-center rounded-md p-2 transition-all hover:bg-neutral-700"
                >
                  <div className="relative h-[150px] w-[150px] overflow-hidden rounded-md">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-gray-200">
                    {result.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSearching && searchQuery.trim() && searchResults.length === 0 && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-neutral-800 py-2 px-4 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <p className="text-sm text-gray-400">Brak wyników</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;