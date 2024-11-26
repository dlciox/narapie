import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../utils/api';
import { useUser } from '../../context/UserContext';

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { ...credentials, password: '[HIDDEN]' });
      const response = await apiService.login(credentials);
      console.log('Login response:', response);
      
      if (response.data.token) {
        login(response.data.user, response.data.token);
        console.log('Login successful, redirecting...');
        navigate('/');
      } else {
        setError('Login failed - no token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md">
            {error}
          </div>
        )}
        <button 
          type="submit"
          className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
