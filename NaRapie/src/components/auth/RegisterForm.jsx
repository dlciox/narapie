import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../utils/api';
import { useUser } from '../../context/UserContext';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Attempting registration with:', {
        ...formData,
        password: '[HIDDEN]'
      });
      
      const response = await apiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      console.log('Registration response:', response);

      if (response.data.token) {
        login(response.data.user, response.data.token);
        navigate('/');
      } else {
        setError('Registration successful but no token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
            minLength="6"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            required
            minLength="6"
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm; 