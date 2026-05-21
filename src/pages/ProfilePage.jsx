import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { User, Crown, DollarSign, Star, UserPlus, LogOut, CalendarDays, Venus } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("dream_earn_profile") || "{}");

  const logout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <div className="container p-8 text-center text-[#9ca3af]">Loading...</div>;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-[24px] overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
              <img
                src={
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${user?.displayName || profile.fullName || "U"}&background=06b6d4&color=fff`
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-semibold">{user?.displayName || profile.fullName || "User"}</h1>
              <p className="text-sm text-[#9ca3af]">{user?.email || profile.email || "Unknown email"}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <span className="text-sm text-[#9ca3af] flex items-center gap-2"><User size={16} /> Full Name</span>
              <span className="text-sm">{user?.displayName || profile.fullName || "-"}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <span className="text-sm text-[#9ca3af] flex items-center gap-2"><Venus size={16} /> Gender</span>
              <span className="text-sm capitalize">{profile.gender || "-"}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <span className="text-sm text-[#9ca3af] flex items-center gap-2"><CalendarDays size={16} /> Date of Birth</span>
              <span className="text-sm">{profile.dob || "-"}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <span className="text-sm text-[#9ca3af] flex items-center gap-2"><DollarSign size={16} /> Total Earned</span>
              <span className="text-sm">78.20 AED</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[rgba(255,255,255,0.08)]">
              <span className="text-sm text-[#9ca3af] flex items-center gap-2"><Crown size={16} /> Level</span>
              <span className="text-sm">Level 3</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.02 }}
          className="w-full btn mt-6 border border-[rgba(255,255,255,0.15)] bg-transparent text-white"
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Log Out</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
