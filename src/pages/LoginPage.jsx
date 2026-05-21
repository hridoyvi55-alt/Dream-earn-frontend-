import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Google, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') checkPasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#05040f]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-[-20%] left-[-20%] w-[700px] h-[700px] bg-purple-600 rounded-full blur-[120px] opacity-30" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, delay: 8 }} className="absolute bottom-[-25%] right-[-15%] w-[750px] h-[750px] bg-cyan-500 rounded-full blur-[130px] opacity-25" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass w-full max-w-md mx-4 p-10 rounded-3xl relative z-10 border border-white/10 shadow-2xl"
      >
        {/* Logo & Title */}
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={38} />
            <h1 className="text-5xl font-bold tracking-tighter">
              Dream <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">Earn</span>
            </h1>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-1 mb-8">Real Money • Real Dreams</p>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">
            {isLogin ? "Welcome Back, Dreamer!" : "Start Your Earning Journey"}
          </h2>
          <p className="text-gray-400 mt-2 text-[15px]">
            {isLogin 
              ? "Sign in to check your earnings" 
              : "Create account & earn up to 500 AED/month"}
          </p>
        </div>

        {/* Toggle Login / Signup */}
        <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${isLogin ? 'bg-white text-black shadow-xl' : 'text-gray-400 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 rounded-xl font-semibold transition-all ${!isLogin ? 'bg-white text-black shadow-xl' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Strong Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-4 text-gray-400 hover:text-white">
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {!isLogin && formData.password && (
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength * 20}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {passwordStrength <= 2 && "Weak • Use uppercase, number & symbol"}
                {passwordStrength === 3 && "Medium"}
                {passwordStrength >= 4 && "Strong Password ✓"}
              </p>
            </div>
          )}

          {error && <p className="text-red-500 text-center text-sm bg-red-500/10 py-2 rounded-xl">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 hover:brightness-110 disabled:opacity-70 transition-all"
          >
            {loading ? "Processing..." : isLogin ? "Login Now" : "Create My Account"}
          </motion.button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 py-4 rounded-2xl font-semibold transition-all"
        >
          <Google size={26} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
