import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { UserPlus, Share2 } from "lucide-react";

const REFERRAL_LINK = "https://dreamearn.app/invite?rid=abc123xyz";

const mockInvites = [
  { id: 1, name: "User A", email: "usera@example.com", status: "active", earned: 2.5, currency: "AED" },
  { id: 2, name: "User B", email: "userb@example.com", status: "active", earned: 2, currency: "AED" },
  { id: 3, name: "User C", email: "userc@example.com", status: "pending", earned: 1.5, currency: "AED" }
];

function copyLink() {
  navigator.clipboard.writeText(REFERRAL_LINK).then(
    () => alert("Referral link copied to clipboard!"),
    () => alert("Failed to copy link.")
  );
}

export default function InvitePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="container p-8 text-center text-[#9ca3af]">Loading invite data...</div>;
  }

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_right,rgba(108,99,255,0.12),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold">Invite Friends</h1>
              <p className="text-sm text-[#9ca3af]">
                Earn 2.0 AED per successful referral.
              </p>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
              <img
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}&background=06b6d4&color=fff`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <div
              className="flex-1 p-4 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4 flex items-center justify-between cursor-pointer"
              onClick={copyLink}
            >
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-[#9ca3af]">Your referral link</p>
                <p className="text-sm truncate">{REFERRAL_LINK}</p>
              </div>
              <Share2 size={18} strokeWidth={2} className="ml-2 text-[#9ca3af]" />
            </div>

            <button onClick={copyLink} className="btn btn-primary px-6 py-4 text-sm">
              Copy Link
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#9ca3af]">Total Invites</span>
              <span className="text-lg font-semibold">12</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#9ca3af]">Active Friends</span>
              <span className="text-lg font-semibold">8</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#9ca3af]">Pending</span>
              <span className="text-lg font-semibold text-amber-500">4</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#9ca3af]">Total Earned</span>
              <span className="text-lg font-semibold text-emerald-500">24.00 AED</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Invited Friends</h2>
            <span className="text-xs text-[#06b6d4] hover:underline cursor-pointer" onClick={() => navigate("/leaderboard")}>
              See leaderboard
            </span>
          </div>

          <div className="space-y-3">
            {mockInvites.map((friend) => (
              <motion.div
                key={friend.id}
                layout
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)] flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#06b6d4] flex items-center justify-center flex-shrink-0">
                    <UserPlus size={14} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{friend.name}</div>
                    <div className="text-xs text-[#9ca3af] truncate">{friend.email}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${friend.status === "active" ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-amber-500/20 text-amber-500 border-amber-500/30"}`}>
                    {friend.status === "active" ? "Active" : "Pending"}
                  </span>
                  <span className="text-sm text-emerald-500">
                    +{friend.earned} {friend.currency}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
