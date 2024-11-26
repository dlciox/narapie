import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

function AdminNav() {
  const handleLogout = () => {
    api.logout();
  };

  return (
    <nav className="bg-neutral-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/admin" className="hover:text-red-500">Dashboard</Link>
          <Link to="/admin/posts" className="hover:text-red-500">Posts</Link>
          <Link to="/admin/posts/create" className="hover:text-red-500">Create Post</Link>
          <Link to="/admin/users" className="hover:text-red-500">Users</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-red-500">View Site</Link>
          <button 
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;