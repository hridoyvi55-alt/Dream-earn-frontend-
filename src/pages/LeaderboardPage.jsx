import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    uid: "u123",
    displayName: "Alex Johnson",
    email: "alex@example.com",
    totalEarned: 210.5,
    currency: "AED",
    level: 7,
    joinDate: new Date(Date.now() - 30 * 24 * 3600000),
  },
  {
    rank: 2,
    uid: "u456",
    displayName: "Sara Khan",
    email: "sara@example.com",
    totalEarned: 185.2,
    currency: "AED",
    level: 6,
    joinDate: new Date(Date.now() - 25 * 24 * 3600000),
  },
  {
    rank: 3,
    uid: "u789",
    displayName: "Tom Wilson",
    email: "tom@example.com",
    totalEarned: 160.8,
    currency: "AED",
    level: 5,
    joinDate: new Date(Date.now() - 20 * 24 * 3600000),
  },
  {
    rank: 4,
    uid: "u101",
    displayName: "Lina Ahmed",
    email: "lina@example.com",
    totalEarned: 142.3,
    currency: "AED",
    level: 5,
    joinDate: new Date(Date.now() - 18 * 24 * 3600000),
  },
  {
    rank: 5,
    uid: "u112",
    displayName: "Mike Carter",
    email: "mike@example.com",
    totalEarned: 135.0,
    currency: "AED",
    level: 4,
    joinDate: new Date(Date.now() - 15 * 24 * 3600000),
  },
];

const mockUser = {
  rank: 42,
  displayName: "User",
  totalEarned: 89.5,
  currency: "AED",
  level: 3,
  joinDate: new Date(Date.now() - 7 * 24 * 3600000),
};

const rankBadgeColor = (rank) => {
  if (rank === 1) return "bg-yellow-500";
  if (rank === 2) return "bg-gray-400";
  if (rank === 3) return "bg-amber-700";
  return "bg-transparent border border-[rgba(255,255,255,0.1)]";
};

export default function LeaderboardPage() {
  const { user: authUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  if (loading) {
    return (
      <div className="container p-8 text-center text-[#9ca3af]">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.08),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold">Leaderboard</h1>
              <p className="text-sm text-[#9ca3af]">
                Top users by total earnings (AED). Compete to earn more.
              </p>
            </div>

            <div
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.15)]"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.8), transparent)",
              }}
            >
              <img
                src={
                  authUser?.photoURL ||
                  "https://ui-avatars.com/api/?name=" +
                    (authUser?.displayName || "U") +
                    "&background=06b6d4&color=fff"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-2 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-white/4">
            {["all", "friends", "referrals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 transition-all ${
                  activeTab === tab
                    ? "bg-[#06b6d4] text-white"
                    : "text-[#9ca3af]"
                }`}
              >
                {tab === "all" && "Global"}
                {tab === "friends" && "Friends"}
                {tab === "referrals" && "Referrals"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            {activeTab === "all" ? "Global Ranking" : "Your " + activeTab}
          </h2>

          <div className="space-y-3">
            {mockLeaderboard.map(({ rank, displayName, totalEarned, currency }) => (
              <motion.div
                key={rank}
                layout
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)] flex flex-wrap items-center justify-between gap-3 group hover:bg-white/4 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${rankBadgeColor(
                      rank
                    )}`}
                  >
                    {rank}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {displayName}
                    </div>
                    <div className="text-xs text-[#9ca3af] mt-0.5">
                      Level {rank <= 3 ? 7 : rank <= 5 ? 6 : 5}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-emerald-500 font-semibold">
                    {totalEarned.toFixed(1)} {currency}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      rank <= 3
                        ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                        : "bg-white/10 text-[#9ca3af] border-amber-200"
                    }`}
                  >
                    Rank #{rank}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* YOU card */}
            <motion.div
              layout
              className="p-4 rounded-xl border border-[#06b6d4]/50 bg-[#06b6d4]/10 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#a855f7]"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, #a855f7, #7c3aed)",
                  }}
                >
                  {mockUser.rank}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    You
                  </div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">
                    Level {mockUser.level}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-emerald-500 font-semibold">
                  {mockUser.totalEarned.toFixed(1)} {mockUser.currency}
                </span>
                <span className="text-xs text-[#9ca3af]">
                  Rank #{mockUser.rank}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
              }
