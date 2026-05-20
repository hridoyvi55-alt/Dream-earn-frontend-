import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { User, Crown, DollarSign, Star, UserPlus, LogOut } from "lucide-react";
import { Auth } from "firebase/auth";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await Auth.signOut();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="container p-8 text-center text-[#9ca3af]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-[24px] overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
              <img
                src={
                  user.photoURL ||
                  "https://ui-avatars.com/api/?name=" +
                    (user.displayName || "U") +
                    "&background=06b6d4&color=fff"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">
                {user.displayName || "User"}
              </h1>
              <p className="text-sm text-[#9ca3af]">
                {user.email || "Unknown email"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ opacity: 0.5 }}
              >
                <User size={16} strokeWidth={2} />
                <span className="text-[#9ca3af]">Profile</span>
              </div>
              <div className="text-xs text-[#9ca3af]">
                Profile settings will be added.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ opacity: 0.5 }}
              >
                <UserPlus size={16} strokeWidth={2} />
                <span className="text-[#9ca3af]">Invite</span>
              </div>
              <div className="text-xs text-[#9ca3af]">
                See your referral link & stats.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ opacity: 0.5 }}
              >
                <Star size={16} strokeWidth={2} />
                <span className="text-[#9ca3af]">Leaderboard Rank</span>
              </div>
              <div className="text-xs text-[#9ca3af]">
                Currently top 10% worldwide.
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ opacity: 0.5 }}
              >
                <DollarSign size={16} strokeWidth={2} />
                <span className="text-[#9ca3af]">Total Earned</span>
              </div>
              <div className="text-xs text-[#9ca3af]">78.20 AED</div>
            </div>
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ opacity: 0.5 }}
              >
                <Crown size={16} strokeWidth={2} />
                <span className="text-[#9ca3af]">Level</span>
              </div>
              <div className="text-xs text-[#9ca3af]">Level 3</div>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.02 }}
          className="w-full btn mt-6 border border-[rgba(255,255,255,0.15)]
            bg-transparent text-white"
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Log Out</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
