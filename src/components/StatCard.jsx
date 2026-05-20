import { motion } from "framer-motion";

export function StatCard({ icon, label, value, subLabel }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -2 }}
      className="card p-4 flex flex-col gap-2"
    >
      <div
        className="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 30% 30%, #06b6d4, transparent 70%), radial-gradient(circle at 70% 70%, #7c3aed, transparent 70%)",
        }}
      >
        {icon}
      </div>
      <div className="grid grid-cols-1 gap-1">
        <p className="text-[11px] text-[#9ca3af]">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
        {subLabel && <p className="text-xs text-[#9ca3af]">{subLabel}</p>}
      </div>
    </motion.div>
  );
}
