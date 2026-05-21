import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Venus, Sparkles, Chrome } from "lucide-react";
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
  const [gender, setGender] = useState("male");
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

      localStorage.setItem(
        "dream_earn_profile",
        JSON.stringify({ fullName, email, gender })
      );

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
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%),#070b14]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />

      <div className="container min-h-screen flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="card w-full max-w-md p-6 md:p-8 shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
              className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-cyan-400"
            >
              <Sparkles size={28} color="white" />
            </motion.div>
            <h1 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Dream
              </span>{" "}
              Earn
            </h1>
            <p className="text-sm text-[#9ca3af] mt-2">Create your account</p>
          </div>

          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#cbd5e1]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400/60 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#cbd5e1]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400/60 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#cbd5e1]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-12 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400/60 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  <div
                    className={`h-full ${strengthColor}`}
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-[#cbd5e1]">Gender</label>
              <div className="relative">
                <Venus className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={18} />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-400/60 transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="btn btn-primary w-full text-base font-semibold py-3 rounded-2xl"
            >
              {busy ? "Creating account..." : "Signup"}
            </button>
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

          <button
            onClick={googleSignup}
            disabled={busy}
            className="mt-5 w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
          >
            <Chrome size={18} className="text-[#e5e7eb]" />
            <span>Continue with Google</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
