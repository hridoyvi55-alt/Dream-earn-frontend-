import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import WithdrawalPage from "../pages/WithdrawalPage";
import TaskPage from "../pages/TaskPage";
import InvitePage from "../pages/InvitePage";
import LeaderboardPage from "../pages/LeaderboardPage";
import SettingsPage from "../pages/SettingsPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="container p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/withdrawal" element={<ProtectedRoute><WithdrawalPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
      <Route path="/invite" element={<ProtectedRoute><InvitePage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
