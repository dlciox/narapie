import { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import apiService from '../../utils/api';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await apiService.deleteUser(userId);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const handleToggleAdmin = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await apiService.updateUserRole(userId, newRole);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update user role');
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNav />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-black rounded-lg shadow-lg shadow-red-900/50 p-6 border border-red-900">
          <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
          
          <div className="space-y-4">
            {users.map(user => (
              <div 
                key={user._id} 
                className="bg-neutral-800 rounded-lg p-4 border border-red-900"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{user.username}</h3>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-400">Role: {user.role}</p>
                    <p className="text-gray-400">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-x-4">
                    <button
                      onClick={() => handleToggleAdmin(user._id, user.role)}
                      className={`px-4 py-2 rounded-md ${
                        user.role === 'admin'
                          ? 'bg-yellow-600 hover:bg-yellow-700'
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white transition-colors`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="text-white text-center">No users found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList; 