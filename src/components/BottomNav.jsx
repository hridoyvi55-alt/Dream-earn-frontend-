import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, DollarSign, Star, User, Settings } from "lucide-react";

const navItems = [
  { path: "/task", label: "Task", icon: DollarSign },
  { path: "/leaderboard", label: "Leaderboard", icon: Star },
  { path: "/withdrawal", label: "Withdrawal", icon: LayoutGrid },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <motion.div
      layout
      className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-[22px] backdrop-blur-xl bg-[#111827] border border-[rgba(255,255,255,0.1)]
        shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        overflow-hidden
        z-50"
      style={{ width: "min(480px, 90vw)" }}
    >
      <div className="grid grid-cols-5 gap-1 p-1">
        {navItems.map(({ path, label, icon: Icon }, idx) => {
          const selected = pathname === path;
          return (
            <motion.button
              key={path}
              onClick={() => navigate(path)}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-2 flex flex-col items-center gap-1 text-[10px] transition-all
                ${selected ? "text-white" : "text-[#9ca3af]"}`}
            >
              <Icon
                size={18}
                strokeWidth={selected ? 2.5 : 2}
                color={selected ? "white" : "currentColor"}
              />
              <span
                className={`transition-all
                  ${selected ? "font-semibold text-[11px]" : "text-[10px]"}`}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
