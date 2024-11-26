import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useUser();
  const token = localStorage.getItem('userToken');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      localStorage.removeItem('userToken');
      return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    console.error('Token validation error:', error);
    localStorage.removeItem('userToken');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;