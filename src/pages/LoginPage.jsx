import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Chrome, Sparkles, ArrowRight } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/", { replace: true });
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setBusy(false);
    }
  };

  const googleLogin = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch {
      setError("Google sign in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(5,8,22,0.35), rgba(5,8,22,0.78)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%)]" />

      <div className="relative z-10 container min-h-screen flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md rounded-[32px] border border-white/14 bg-white/8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-6 md:p-8"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_35px_rgba(34,211,238,0.35)]"
            >
              <Sparkles size={28} color="white" />
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                Dream Earn
              </span>
            </h1>
            <p className="mt-3 text-sm text-[#e5e7eb]">
              Welcome back. Sign in to continue.
            </p>
          </div>

          {error && (
            <div className="mt-5 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              abel className="text-sm text-[#e5e7eb]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-4 rounded-3xl bg-black/18 border border-white/10 outline-none focus:border-cyan-400/70 focus:bg-black/24 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              abel className="text-sm text-[#e5e7eb]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-14 py-4 rounded-3xl bg-black/18 border border-white/10 outline-none focus:border-cyan-400/70 focus:bg-black/24 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e5e7eb] hover:text-white"
                >
                  <motion.div animate={{ scale: showPassword ? 1.08 : 1 }} transition={{ duration: 0.2 }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </motion.div>
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(34,211,238,0.25)" }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={busy}
              className="w-full py-4 rounded-3xl text-base font-semibold bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-white shadow-lg shadow-cyan-500/20"
            >
              {busy ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-[#e5e7eb]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-300 font-semibold hover:underline">
              Signup
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-[#e5e7eb]">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <motion.button
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={googleLogin}
            disabled={busy}
            className="mt-5 w-full flex items-center justify-center gap-3 py-4 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <Chrome size={18} className="text-white" />
            <span>Continue with Google</span>
            <ArrowRight size={16} className="text-cyan-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
