import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import MainPage from "./pages/MainPage";
import PolishMainstreamPage from "./pages/PolishMainstreamPage";
import PolishUndergroundPage from "./pages/PolishUndergroundPage";
import InternationalPage from "./pages/InternationalPage";
import ConcertsPage from "./pages/ConcertsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsList from "./components/Admin/PostsList";
import CreatePost from "./components/Admin/CreatePost";
import EditPost from "./components/Admin/EditPost";
import UserProfile from "./components/user/UserProfile";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/Admin/UsersList";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-neutral-900">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<MainPage />} />
            <Route path="/mainstream" element={<PolishMainstreamPage />} />
            <Route path="/underground" element={<PolishUndergroundPage />} />
            <Route path="/international" element={<InternationalPage />} />
            <Route path="/concerts" element={<ConcertsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected user routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts" element={
              <ProtectedRoute adminOnly>
                <PostsList />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/create" element={
              <ProtectedRoute adminOnly>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/edit/:id" element={
              <ProtectedRoute adminOnly>
                <EditPost />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <UsersList />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

