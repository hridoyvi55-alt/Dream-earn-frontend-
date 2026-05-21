import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { DollarSign, BarChart3, Gamepad2, Target, Sparkles } from "lucide-react";

const mockTasks = {
  ads: [
    { id: 1, title: "Watch 5 ads to earn 2.50 AED", reward: 2.5, currency: "AED", status: "available", duration: "30–40 seconds", description: "Complete 5 advertisement views to unlock reward." },
    { id: 2, title: "Watch 10 ads to earn 4.00 AED", reward: 4, currency: "AED", status: "locked", duration: "50–60 seconds", description: "Complete 10 advertisement views to unlock reward." }
  ],
  survey: [
    { id: 3, title: "Complete short survey (10 questions)", reward: 1.5, currency: "AED", status: "available", duration: "2–3 minutes", description: "Answer 10 quick questions about your preferences." },
    { id: 4, title: "Long product feedback survey (20 questions)", reward: 3, currency: "AED", status: "locked", duration: "5–8 minutes", description: "Help teams improve their product with detailed feedback." }
  ],
  game: [
    { id: 5, title: "Install & open: Puzzle Rush", reward: 2, currency: "AED", status: "available", duration: "1–2 minutes", description: "Install, open, and reach level 2." },
    { id: 6, title: "Install & play: Match Runner", reward: 4, currency: "AED", status: "pending", duration: "3–5 minutes", description: "Install, open, and complete the first mission." }
  ]
};

export default function TaskPage() {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState("ads");

  if (loading) {
    return <div className="container p-8 text-center text-[#9ca3af]">Loading tasks...</div>;
  }

  const tasks = mockTasks[activeTab] || [];

  const tabClass = (tab) => (activeTab === tab ? "bg-[#06b6d4] text-white" : "bg-white/4 text-[#9ca3af]");

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.08),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold">Tasks</h1>
              <p className="text-sm text-[#9ca3af]">
                Watch ads, complete surveys, install & play games to earn AED.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#9ca3af]">Your balance</div>
              <div className="text-xl font-semibold text-white">45.00 AED</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button onClick={() => setActiveTab("ads")} className={`py-3 rounded-xl transition-all ${tabClass("ads")}`}>
              <div className="flex items-center justify-center gap-2 text-sm font-medium"><DollarSign size={16} /> Ads</div>
            </button>
            <button onClick={() => setActiveTab("survey")} className={`py-3 rounded-xl transition-all ${tabClass("survey")}`}>
              <div className="flex items-center justify-center gap-2 text-sm font-medium"><BarChart3 size={16} /> Survey</div>
            </button>
            <button onClick={() => setActiveTab("game")} className={`py-3 rounded-xl transition-all ${tabClass("game")}`}>
              <div className="flex items-center justify-center gap-2 text-sm font-medium"><Gamepad2 size={16} /> Game</div>
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
          <h2 className="text-lg font-semibold mb-4 capitalize">{activeTab}</h2>

          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div key={task.id} layout className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 bg-[rgba(6,182,212,0.25)]">
                        {activeTab === "ads" && <DollarSign size={12} color="#ffffff" />}
                        {activeTab === "survey" && <BarChart3 size={12} color="#ffffff" />}
                        {activeTab === "game" && <Gamepad2 size={12} color="#ffffff" />}
                      </span>
                      <span className="font-medium text-sm truncate">{task.title}</span>
                    </div>
                    <p className="text-xs text-[#9ca3af] mt-1">{task.description}</p>
                  </div>

                  <div className="text-right 
