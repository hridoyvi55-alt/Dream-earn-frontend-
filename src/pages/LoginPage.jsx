import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Sign in failed. Check email and password.");
    } finally {
      setLoadingAction(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoadingAction(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Google sign in failed.");
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
          <p className="text-sm text-[#9ca3af] mt-1">Sign in to continue</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
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

          <button type="submit" disabled={loadingAction} className="w-full btn btn-primary">
            {loadingAction ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          onClick={signInWithGoogle}
          disabled={loadingAction}
          className="w-full mt-3 p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-[#9ca3af] mt-4">
          No account? <Link to="/signup" className="text-[#06b6d4]">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
