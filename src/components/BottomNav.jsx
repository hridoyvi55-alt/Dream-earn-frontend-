import { NavLink } from "react-router-dom";
import { Home, ListChecks, User, Send, Trophy, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/invite", label: "Invite", icon: Send },
  { to: "/leaderboard", label: "Rank", icon: Trophy },
  { to: "/profile", label: "Me", icon: User },
  { to: "/settings", label: "Set", icon: Settings }
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[rgba(255,255,255,0.08)] bg-[#0b0f1a]/95 backdrop-blur-xl">
      <div className="grid grid-cols-6">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-3 text-xs ${
                isActive ? "text-[#06b6d4]" : "text-[#9ca3af]"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
