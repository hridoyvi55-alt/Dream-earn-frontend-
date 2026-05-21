import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Globe, BarChart3, Shield, LogOut, ImageIcon } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true); // mock gestion
  const [language, setLanguage] = useState("en-US");
  const [showTutorial, setShowTutorial] = useState(true);
  const [receiveNotifications, setReceiveNotifications] = useState(true);

  if (loading) {
    return (
      <div className="container p-8 text-center text-[#9ca3af]">
        Loading settings...
      </div>
    );
  }

  const logout = async () => {
    // await Auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen pb-20 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.06),transparent_60%),#0b0f1a]">
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-lg font-semibold">Settings</h1>
              <p className="text-sm text-[#9ca3af]">
                Customize your Dream Earn experience.
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
                  user?.photoURL ||
                  "https://ui-avatars.com/api/?name=" +
                    (user?.displayName || "U") +
                    "&background=06b6d4&color=fff"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Appearance */}
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                    }}
                  >
                    <ImageIcon size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Appearance</div>
                    <div className="text-xs text-[#9ca3af]">
                      Dark/light mode & theme
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.15)]
                  bg-white/4 text-sm hover:bg-white/6 transition-all"
              >
                {darkMode ? (
                  <Moon size={16} strokeWidth={2} />
                ) : (
                  <Sun size={16} strokeWidth={2} />
                )}
                <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>

            {/* Language */}
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed, #a855f7)",
                    }}
                  >
                    <Globe size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Language</div>
                    <div className="text-xs text-[#9ca3af]">
                      Interface & help content
                    </div>
                  </div>
                </div>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[rgba(255,255,255,0.15)] bg-white/4 text-sm w-36"
              >
                <option value="en-US">English (US)</option>
                <option value="bn-BD">বাংলা (BD)</option>
                <option value="ar-SA">العربية (السعودية)</option>
                <option value="fr-FR">Français (France)</option>
              </select>
            </div>

            {/* Analytics / Tracking */}
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981, #34d399)",
                    }}
                  >
                    <BarChart3 size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Analytics</div>
                    <div className="text-xs text-[#9ca3af]">
                      Improve app experience
                    </div>
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTutorial}
                  onChange={(e) => setShowTutorial(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-9 h-5 rounded-full transition-all ${
                    showTutorial ? "bg-[#06b6d4]" : "bg-gray-600"
                  }`}
                ></div>
                <span className="ml-2 text-xs text-[#9ca3af]">
                  {showTutorial ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>

            {/* Notifications */}
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #f59e0b, #fbbf24)",
                    }}
                  >
                    <Shield size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Notifications</div>
                    <div className="text-xs text-[#9ca3af]">
                      Withdrawal, task, & reward alerts
                    </div>
                  </div>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={receiveNotifications}
                  onChange={(e) => setReceiveNotifications(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-9 h-5 rounded-full transition-all ${
                    receiveNotifications ? "bg-[#06b6d4]" : "bg-gray-600"
                  }`}
                ></div>
                <span className="ml-2 text-xs text-[#9ca3af]">
                  {receiveNotifications ? "Enabled" : "Disabled"}
                </span>
              </label>
            </div>

            {/* Log Out */}
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.02 }}
              className="w-full btn mt-6 border border-[rgba(255,255,255,0.15)]
                bg-red-700/20 text-red-500 hover:bg-red-700/30 text-sm"
            >
              <LogOut size={16} strokeWidth={2} />
              <span>Log Out</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
