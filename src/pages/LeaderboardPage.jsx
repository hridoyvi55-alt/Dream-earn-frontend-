import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";

const mockLeaderboard = [
  { rank: 1, displayName: "Alex Johnson", totalEarned: 210.5, currency: "AED" },
  { rank: 2, displayName: "Sara Khan", totalEarned: 185.2, currency: "AED" },
  { rank: 3, displayName: "Tom Wilson", totalEarned: 160.8, currency: "AED" },
  { rank: 4, displayName: "Lina Ahmed", totalEarned: 142.3, currency: "AED" },
  { rank: 5, displayName: "Mike Carter", totalEarned: 135, currency: "AED" }
];

const myUser = { rank: 42, totalEarned: 89.5, currency: "AED", level: 3 };

export default function LeaderboardPage() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  if (loading) {
    return <div className="container p-8 text-center text-[#9ca3af]">Loading leaderboard...</div>;
  }

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.08),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold">Leaderboard</h1>
              <p className="text-sm text-[#9ca3af]">
                Top users by total earnings (AED).
              </p>
            </div>

            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}&background=06b6d4&color=fff`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {["all", "friends", "referrals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-xl transition-all ${activeTab === tab ? "bg-[#06b6d4] text-white" : "bg-white/4 text-[#9ca3af]"}`}
              >
                {tab === "all" && "Global"}
                {tab === "friends" && "Friends"}
                {tab === "referrals" && "Referrals"}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Global Ranking</h2>

          <div className="space-y-3">
            {mockLeaderboard.map(({ rank, displayName, totalEarned, currency }) => (
              <motion.div
                key={rank}
                layout
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)] flex flex-wrap items-center justify-between gap-3 hover:bg-white/4 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-400" : rank === 3 ? "bg-amber-700" : "bg-white/10"}`}>
                    {rank}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{displayName}</div>
                    <div className="text-xs text-[#9ca3af] mt-0.5">Level {rank <= 3 ? 7 : rank <= 5 ? 6 : 5}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-emerald-500 font-semibold">
                    {totalEarned.toFixed(1)} {currency}
                  </span>
                  <span className="text-xs text-[#9ca3af]">Rank #{rank}</span>
                </div>
              </motion.div>
            ))}

            <motion.div layout className="p-4 rounded-xl border border-[#06b6d4]/50 bg-[#06b6d4]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-[#7c3aed]">
                  {myUser.rank}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">You</div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">Level {myUser.level}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-emerald-500 font-semibold">
                  {myUser.totalEarned.toFixed(1)} {myUser.currency}
                </span>
                <span className="text-xs text-[#9ca3af]">Rank #{myUser.rank}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
