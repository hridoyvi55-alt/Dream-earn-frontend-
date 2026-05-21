import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { DollarSign, BarChart3, Gamepad2, Target, Sparkle } from "lucide-react";

// Mock task list
const mockTasks = {
  ads: [
    {
      id: 1,
      title: "Watch 5 ads to earn 2.50 AED",
      reward: 2.5,
      currency: "AED",
      type: "ads",
      status: "available",
      duration: "30–40 seconds",
      description: "Complete 5 advertisement views to unlock reward.",
    },
    {
      id: 2,
      title: "Watch 10 ads to earn 4.00 AED",
      reward: 4.0,
      currency: "AED",
      type: "ads",
      status: "locked",
      duration: "50–60 seconds",
      description: "Complete 10 advertisement views to unlock reward.",
    },
  ],
  survey: [
    {
      id: 3,
      title: "Complete short survey (10 questions)",
      reward: 1.5,
      currency: "AED",
      type: "survey",
      status: "available",
      duration: "2–3 minutes",
      description: "Answer 10 quick questions about your preferences.",
    },
    {
      id: 4,
      title: "Long product feedback survey (20 questions)",
      reward: 3.0,
      currency: "AED",
      type: "survey",
      status: "locked",
      duration: "5–8 minutes",
      description: "Help teams improve their product with detailed feedback.",
    },
  ],
  game: [
    {
      id: 5,
      title: "Install & open: Puzzle Rush",
      reward: 2.0,
      currency: "AED",
      type: "game",
      status: "available",
      duration: "1–2 minutes",
      description: "Install, open, and reach level 2.",
    },
    {
      id: 6,
      title: "Install & play: Match Runner",
      reward: 4.0,
      currency: "AED",
      type: "game",
      status: "pending",
      duration: "3–5 minutes",
      description: "Install, open, and complete the first mission.",
    },
  ],
};

export default function TaskPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ads");

  if (loading) {
    return (
      <div className="container p-8 text-center text-[#9ca3af]">
        Loading tasks...
      </div>
    );
  }

  const tasks = mockTasks[activeTab] || [];

  const tabStyle = (tab) => {
    return activeTab === tab
      ? "bg-[#06b6d4] text-white"
      : "bg-white/4 text-[#9ca3af]";
  };

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

          {/* Tabs */}
          <div className="mt-4 flex gap-2 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-white/4">
            <button
              onClick={() => setActiveTab("ads")}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${tabStyle(
                "ads"
              )}`}
            >
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <DollarSign size={16} strokeWidth={2.2} /> Ads
              </div>
            </button>
            <button
              onClick={() => setActiveTab("survey")}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${tabStyle(
                "survey"
              )}`}
            >
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <BarChart3 size={16} strokeWidth={2.2} /> Survey
              </div>
            </button>
            <button
              onClick={() => setActiveTab("game")}
              className={`flex-1 py-2 px-4 rounded-xl transition-all ${tabStyle(
                "game"
              )}`}
            >
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Gamepad2 size={16} strokeWidth={2.2} /> Game
              </div>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h2 className="text-lg font-semibold mb-4 capitalize">{activeTab}</h2>

          <div className="space-y-4">
            {tasks.length ? (
              tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  className="p-4 rounded-xl border border-[rgba(255,255,255,0.1)]"
                  whileHover={{ translateY: -2, scale: 1.01 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.8), transparent)",
                          }}
                        >
                          {activeTab === "ads" && (
                            <DollarSign size={12} strokeWidth={2} color="#ffffff" />
                          )}
                          {activeTab === "survey" && (
                            <BarChart3 size={12} strokeWidth={2} color="#ffffff" />
                          )}
                          {activeTab === "game" && (
                            <Gamepad2 size={12} strokeWidth={2} color="#ffffff" />
                          )}
                        </span>
                        <span className="font-medium text-sm truncate">
                          {task.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {task.description}
                      </p>
                    </div>

                    <div className="text-right text-sm">
                      <div className="font-bold text-white">
                        {task.reward.toFixed(2)} {task.currency}
                      </div>
                      <div className="text-xs text-[#9ca3af] mt-0.5">
                        {task.duration}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    {task.status === "available" && (
                      <button
                        onClick={() => {
                          // simulate open task view (will be real task page)
                          alert(
                            `Task view opening for:
${task.title}
Reward: ${task.reward.toFixed(
                              2
                            )} AED`
                          );
                        }}
                        className="px-4 py-2 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-white text-sm font-medium"
                      >
                        Start
                      </button>
                    )}

                    {task.status === "pending" && (
                      <span className="text-xs text-amber-500 flex-1">
                        <Sparkle size={14} strokeWidth={2.2} className="inline mr-1" />
                        Pending verification
                      </span>
                    )}

                    {task.status === "locked" && (
                      <span className="text-xs text-[#9ca3af] flex-1">
                        <Target size={14} strokeWidth={2.2} className="inline mr-1" />
                        Locked — earn more to unlock
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-[#9ca3af] p-6">
                No tasks available for this category yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
                }
