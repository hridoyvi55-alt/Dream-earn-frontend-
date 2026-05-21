import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Google, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

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

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#05040f] flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md mx-4 p-10 rounded-3xl z-10"
      >
        <div className="text-center mb-10">
          <Sparkles className="mx-auto text-yellow-400 mb-3" size={50} />
          <h1 className="text-5xl font-bold">
            Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Earn</span>
          </h1>
          <p className="text-gray-400 mt-2">Earn Real AED Daily</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">
            {isLogin ? "Welcome Back" : "Create New Account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" required />
          )}

          <input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" 
            required 
          />

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" 
              required 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-4">
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-lg hover:brightness-110 transition"
          >
            {loading ? "Please Wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">OR</div>

        <button onClick={handleGoogle} className="w-full py-4 rounded-2xl border border-white/20 flex items-center justify-center gap-3 hover:bg-white/10 transition">
          <Google size={26} /> Continue with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
