import { motion } from "framer-motion";
import { DollarSign, BarChart3, Gamepad2, Gift, UserPlus, LayoutGrid } from "lucide-react";

const actions = [
  { label: "Ads", path: "/task/ads", color: "#06b6d4", icon: DollarSign },
  { label: "Survey", path: "/task/survey", color: "#3b82f6", icon: BarChart3 },
  { label: "Game Install", path: "/task/game", color: "#10b981", icon: Gamepad2 },
  { label: "Invite", path: "/invite", color: "#f59e0b", icon: UserPlus },
  { label: "Withdrawal", path: "/withdrawal", color: "#3b82f6", icon: Gift },
  { label: "Dashboard", path: "/", color: "#a855f7", icon: LayoutGrid },
];

export function ActionCard({ navigate }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ label, path, color, icon: Icon }, idx) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.03, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(path)}
          className="card p-4 flex items-center gap-3 group"
          style={{
            "--c": color,
            background: "radial-gradient(circle at 20% 20%, rgba(var(--c-rgb), 0.15), transparent 70%), var(--card)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(var(--c-rgb), 0.8), rgba(var(--c-rgb), 0.5))",
            }}
          >
            <Icon size={18} strokeWidth={2.2} color="#ffffff" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold">{label}</p>
            <p className="text-xs text-[#9ca3af]">
              {label === "Ads" && "Watch ads"}
              {label === "Survey" && "Complete surveys"}
              {label === "Game Install" && "Install & play"}
              {label === "Invite" && "Invite friends"}
              {label === "Withdrawal" && "Withdraw your earnings"}
              {label === "Dashboard" && "Back to main dashboard"}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
