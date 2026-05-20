import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) navigate("/", { replace: true });
  }, [user, authLoading, navigate]);

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-email")
        setError("No account with this email");
      else if (err.code === "auth/wrong-password") setError("Wrong password");
      else setError("Sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.code === "auth/popup-blocked") setError("Please allow popups.");
      else setError("Google sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#0b0f1a_0%,#111827_100%)]">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute w-96 h-96 rounded-full bg-[#7c3aed] top-20 left-20 blur-[160px]"></div>
        <div className="absolute w-96 h-96 rounded-full bg-[#06b6d4] bottom-20 right-10 blur-[160px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-md w-full overflow-hidden backdrop-blur-3xl"
      >
        <div className="p-8 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-[24px] font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent">
                Dream
              </span>{" "}
              Earn
            </div>
            <p className="text-[#9ca3af] text-sm mt-1">
              Earn real money through tasks, surveys, game installs, and invites
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center p-2 rounded-lg bg-red-500/10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-[#9ca3af]">Email</label>
              <input
                {...register("email", { required: true, minLength: 5 })}
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-[#9ca3af]">Password</label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="********"
                className="w-full p-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/4"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-2 text-[12px] text-[#9ca3af]">
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.1)]"></div>
            or
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.1)]"></div>
          </div>

          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-[rgba(255,255,255,0.1)]
              bg-white/4 hover:bg-white/6 transition-all"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width="18"
              height="18"
            />
            <span>Continue with Google</span>
          </button>

          <div className="text-center text-xs text-[#9ca3af] mt-4">
            By signing in, you agree to the Terms &amp; Conditions
          </div>
        </div>
      </motion.div>
    </div>
  );
}
