import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { DollarSign, BarChart3, UserPlus, LayoutGrid } from "lucide-react";
import { ActionCard } from "../components/ActionCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container p-8 text-center">
        <div className="text-[#9ca3af]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.15),transparent_60%),radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.12),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="text-lg font-semibold">
                Welcome,{" "}
                <span
                  className="bg-gradient-to-r from-[#06b6d4] to-[#7c3aed]
                    bg-clip-text text-transparent"
                >
                  {user.displayName || "User"}{" "}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="inline-flex items-center justify-center w-2 h-2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, #06b6d4, transparent)",
                  }}
                ></span>
                <span className="text-[12px] text-[#9ca3af]">
                  Balance: <strong className="text-white">45.00 AED</strong>
                </span>
              </div>
            </div>

            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mt-6"
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <ActionCard navigate={navigate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mt-6"
        >
          <h2 className="text-lg font-semibold mb-4">Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Total Earned"
              value="89.50 AED"
              subLabel="Last 7 days"
              icon={<DollarSign size={20} strokeWidth={2.2} color="#06b6d4" />}
            />
            <StatCard
              label="Active Tasks"
              value="5"
              subLabel="Today"
              icon={<LayoutGrid size={20} strokeWidth={2.2} color="#a855f7" />}
            />
            <StatCard
              label="Referrals"
              value="12"
              subLabel="Invited friends"
              icon={<UserPlus size={20} strokeWidth={2.2} color="#f59e0b" />}
            />
            <StatCard
              label="Rank"
              value="#42"
              subLabel="Leaderboard rank"
              icon={<BarChart3 size={20} strokeWidth={2.2} color="#3b82f6" />}
            />
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
