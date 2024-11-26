import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SearchBar from "../search/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-8">
              <Link to="/" className="text-3xl font-bold text-red-600">
                NaRapie
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`rounded-md px-3 py-2 text-base font-medium ${
                    isActivePath("/")
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-red-900 hover:text-red-200"
                  }`}
                >
                  Strona Główna
                </Link>
                <Link
                  to="/mainstream"
                  className={`rounded-md px-3 py-2 text-base font-medium ${
                    isActivePath("/mainstream")
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-red-900 hover:text-red-200"
                  }`}
                >
                  Polski Mainstream
                </Link>
                <Link
                  to="/underground"
                  className={`rounded-md px-3 py-2 text-base font-medium ${
                    isActivePath("/underground")
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-red-900 hover:text-red-200"
                  }`}
                >
                  Polski Underground
                </Link>
                <Link
                  to="/international"
                  className={`rounded-md px-3 py-2 text-base font-medium ${
                    isActivePath("/international")
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-red-900 hover:text-red-200"
                  }`}
                >
                  Zagranica
                </Link>
                <Link
                  to="/concerts"
                  className={`rounded-md px-3 py-2 text-base font-medium ${
                    isActivePath("/concerts")
                      ? "bg-red-900 text-white"
                      : "text-gray-300 hover:bg-red-900 hover:text-red-200"
                  }`}
                >
                  Koncerty
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Search and Auth */}
          <div className="flex items-center space-x-4">
            <div className="w-40 md:w-48">
              <SearchBar />
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-gray-300 hover:bg-red-900 hover:text-red-200 px-3 py-2 rounded-md text-base font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:bg-red-900 hover:text-red-200 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-300 hover:bg-red-900 hover:text-red-200 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-red-900 hover:text-red-200 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-red-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-900/30 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath("/")
                  ? "bg-red-900 text-white"
                  : "text-gray-300 hover:bg-red-900 hover:text-red-200"
              }`}
            >
              Strona Główna
            </Link>
            <Link
              to="/mainstream"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath("/mainstream")
                  ? "bg-red-900 text-white"
                  : "text-gray-300 hover:bg-red-900 hover:text-red-200"
              }`}
            >
              Polski Mainstream
            </Link>
            <Link
              to="/underground"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath("/underground")
                  ? "bg-red-900 text-white"
                  : "text-gray-300 hover:bg-red-900 hover:text-red-200"
              }`}
            >
              Polski Underground
            </Link>
            <Link
              to="/international"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath("/international")
                  ? "bg-red-900 text-white"
                  : "text-gray-300 hover:bg-red-900 hover:text-red-200"
              }`}
            >
              Zagranica
            </Link>
            <Link
              to="/concerts"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath("/concerts")
                  ? "bg-red-900 text-white"
                  : "text-gray-300 hover:bg-red-900 hover:text-red-200"
              }`}
            >
              Koncerty
            </Link>
            
            {/* Mobile Auth Links */}
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900 hover:text-red-200"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900 hover:text-red-200"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900 hover:text-red-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900 hover:text-red-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900 hover:text-red-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
