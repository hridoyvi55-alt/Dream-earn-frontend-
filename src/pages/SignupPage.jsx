import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Sparkles, Chrome, ArrowRight } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";

function scorePassword(pw) {
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[a-z]/.test(pw)) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/d/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return score;
}

export default function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const score = useMemo(() => scorePassword(password), [password]);
  const strengthLabel =
    score <= 2 ? "Weak" : score === 3 ? "Medium" : "Strong";
  const strengthColor =
    score <= 2 ? "bg-red-500" : score === 3 ? "bg-amber-500" : "bg-emerald-500";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (score < 3) {
      setError("Password must be at least Medium strength.");
      return;
    }

    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: fullName });

      localStorage.setItem("dream_earn_profile", JSON.stringify({ fullName, email }));
      navigate("/", { replace: true });
    } catch {
      setError("Signup failed. Email may already be used.");
    } finally {
      setBusy(false);
    }
  };

  const googleSignup = async () => {
    setBusy(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch {
      setError("Google signup failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_35%)]" />
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(6,182,212,0.06),rgba(168,85,247,0.06),rgba(14,165,233,0.06),rgba(6,182,212,0.06))] bg-[length:300%_300%]"
      />

      <div className="container min-h-screen flex items-center justify-center py-8">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_26%)]" />
            <div className="relative z-10 flex flex-col justify-between w-full">
              <div>
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.06, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 via-sky-400 to-cyan-400 shadow-[0_0_35px_rgba(124,58,237,0.35)]"
                >
                  <Sparkles size={28} color="white" />
                </motion.div>

                <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                    Dream
                  </span>{" "}
                  Earn
                </h1>
                <p className="mt-4 text-[#cbd5e1] max-w-md text-base leading-7">
                  Create your account and enter a premium animated experience built for growth.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-3xl bg-black/20 border border-white/10 p-4">
                  <div className="text-cyan-300 font-semibold">Strong Security</div>
                  <div className="text-[#9ca3af] mt-1">Password strength meter is ready.</div>
                </div>
                <div className="rounded-3xl bg-black/20 border border-white/10 p-4">
                  <div className="text-violet-300 font-semibold">Fast Signup</div>
                  <div className="text-[#9ca3af] mt-1">Smooth flow with elegant motion.</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-6 md:p-8"
          >
            <div className="lg:hidden text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 via-sky-400 to-cyan-400 shadow-[0_0_35px_rgba(124,58,237,0.35)]"
              >
                <Sparkles size={28} color="white" />
              </motion.div>
              <h1 className="text-3xl font-black">
                <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Dream
                </span>{" "}
                Earn
              </h1>
              <p className="text-sm text-[#9ca3af] mt-2">Create your account</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-sm text-[#9ca3af] mt-1">Fill in your details to get started.</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-[#cbd5e1]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" size={18} />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-4 rounded-3xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400/70 focus:bg-black/25 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#cbd5e1]">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300" size={18} />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-4 rounded-3xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400/70 focus:bg-black/25 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#cbd5e1]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-11 pr-14 py-4 rounded-3xl bg-black/20 border border-white/10 outline-none focus:border-cyan-400/70 focus:bg-black/25 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    <motion.div animate={{ scale: showPassword ? 1.08 : 1 }} transition={{ duration: 0.2 }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.div>
                  </button>
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#9ca3af]">Password strength</span>
                    <span className={`font-semibold ${score <= 2 ? "text-red-400" : score === 3 ? "text-amber-400" : "text-emerald-400"}`}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${strengthColor}`} style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(34,211,238,0.25)" }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={busy}
                className="w-full py-4 rounded-3xl text-base font-semibold bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 text-white shadow-lg shadow-cyan-500/20"
              >
                {busy ? "Creating account..." : "Signup"}
              </motion.button>
            </form>

            <div className="mt-4 text-center text-sm text-[#9ca3af]">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-300 font-semibold hover:underline">
                Login
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-[#9ca3af]">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <motion.button
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={googleSignup}
              disabled={busy}
              className="mt-5 w-full flex items-center justify-center gap-3 py-4 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              <Chrome size={18} className="text-[#e5e7eb]" />
              <span>Continue with Google</span>
              <ArrowRight size={16} className="text-cyan-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
