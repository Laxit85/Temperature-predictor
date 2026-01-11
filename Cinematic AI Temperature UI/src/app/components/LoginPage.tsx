import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/predict');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Back button */}
      <Link to="/">
        <motion.button
          className="absolute left-8 top-8 z-50 flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-purple-100 backdrop-blur-xl border border-white/20 transition-colors hover:bg-white/20"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </motion.button>
      </Link>

      {/* Login/Signup Card */}
      <div className="flex min-h-screen items-center justify-center px-8">
        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glassmorphism card */}
          <div className="relative overflow-hidden rounded-3xl bg-white/10 p-10 backdrop-blur-2xl border border-white/20 shadow-2xl">
            {/* Card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-50" />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-purple-100/70">
                  {isSignUp
                    ? 'Sign up to start predicting temperatures'
                    : 'Sign in to your account'}
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field (only for signup) */}
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <div
                      className={`relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border transition-all ${
                        focusedField === 'name'
                          ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                          : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-center px-4 py-4">
                        <User className="h-5 w-5 text-purple-300" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="flex-1 bg-transparent px-4 text-white placeholder-purple-200/50 outline-none"
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      {focusedField === 'name' && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                          layoutId="inputUnderline"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Email field */}
                <div className="relative">
                  <div
                    className={`relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border transition-all ${
                      focusedField === 'email'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-center px-4 py-4">
                      <Mail className="h-5 w-5 text-purple-300" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="flex-1 bg-transparent px-4 text-white placeholder-purple-200/50 outline-none"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>

                {/* Password field */}
                <div className="relative">
                  <div
                    className={`relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border transition-all ${
                      focusedField === 'password'
                        ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-center px-4 py-4">
                      <Lock className="h-5 w-5 text-purple-300" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="flex-1 bg-transparent px-4 text-white placeholder-purple-200/50 outline-none"
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    {focusedField === 'password' && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="relative w-full overflow-hidden rounded-xl py-4 font-semibold text-white shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%', skewX: -15 }}
                    whileHover={{
                      x: '100%',
                      transition: { duration: 0.6 },
                    }}
                  />
                  <span className="relative z-10">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </span>
                </motion.button>
              </form>

              {/* Toggle signup/signin */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
