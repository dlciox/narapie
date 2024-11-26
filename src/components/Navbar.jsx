import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-black border-b border-red-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            Na Rapie
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-red-500">
              Home
            </Link>
            <Link to="/login" className="text-white hover:text-red-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 