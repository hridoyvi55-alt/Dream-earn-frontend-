import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function strengthScore(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function strengthLabel(score) {
  if (score <= 2) return { label: "Weak", color: "bg-red-500", text: "text-red-500" };
  if (score === 3) return { label: "Medium", color: "bg-amber-500", text: "text-amber-500" };
  return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
}

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const navigate = useNavigate();

  const score = useMemo(() => strengthScore(password), [password]);
  const strength = strengthLabel(score);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    setError("");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: fullName });
      localStorage.setItem(
        "dream_earn_profile",
        JSON.stringify({ fullName, gender, dob, email })
      );
      navigate("/", { replace: true });
    } catch (err) {
      setError("Signup failed. Try another email or stronger password.");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0f1a_0%,#111827_100%)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card max-w-md w-full p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#06b6d4]">Dream</span> Earn
          </h1>
          <p className="text-sm text-[#9ca3af] mt-1">Create your account</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="space-y-2">
            <div className={`text-sm font-medium ${strength.text}`}>Password Strength: {strength.label}</div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full ${strength.color}`}
                style={{ width: `${(score / 5) * 100}%` }}
              />
            </div>
            <div className="text-xs text-[#9ca3af]">
              Use 8+ chars, uppercase, lowercase, number, and special character.
            </div>
          </div>

          <button type="submit" disabled={loadingAction} className="w-full btn btn-primary">
            {loadingAction ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#9ca3af] mt-4">
          Already have an account? <Link to="/login" className="text-[#06b6d4]">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
