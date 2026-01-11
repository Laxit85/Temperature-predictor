import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Cloud, Sun, Wind, Droplets, Zap, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';

export default function HomePage() {
  const floatingIcons = [
    { Icon: Sun, delay: 0, duration: 3, x: 100, y: 50 },
    { Icon: Cloud, delay: 0.5, duration: 4, x: -80, y: 80 },
    { Icon: Wind, delay: 1, duration: 3.5, x: 120, y: -60 },
    { Icon: Droplets, delay: 1.5, duration: 4.5, x: -100, y: -50 },
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models for accurate temperature forecasting',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analysis',
      description: 'Get instant predictions based on current atmospheric conditions',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Cloud,
      title: 'Historical Data',
      description: 'Access comprehensive weather patterns and prediction history',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 h-full w-full rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 h-full w-full rounded-full bg-gradient-to-tl from-blue-600/30 to-cyan-600/30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Navbar />

      {/* Floating weather icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10"
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + index * 10}%`,
          }}
          animate={{
            x: [0, item.x, 0],
            y: [0, item.y, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <item.Icon className="h-24 w-24 text-purple-300" strokeWidth={1} />
        </motion.div>
      ))}

      {/* Hero Section */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-32">
        <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="mb-6 text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, staggerChildren: 0.1 }}
            >
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Predict Temperature
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                with AI Precision
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-12 max-w-2xl text-xl text-purple-100/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Harness the power of artificial intelligence to forecast temperatures
              with unprecedented accuracy. Experience the future of weather prediction.
            </motion.p>
          </motion.div>

          {/* CTA Button with Glow */}
          <Link to="/predict">
            <motion.button
              className="group relative overflow-hidden rounded-2xl px-12 py-5 text-lg font-bold text-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-100 blur-xl transition-opacity group-hover:opacity-75" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />

              {/* Hover ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              <span className="relative z-10 flex items-center gap-2">
                Start Predicting
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 pb-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />

              {/* Icon with gradient */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-50`} />
                <div className={`relative inline-block rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-xl`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="relative mb-3 text-2xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="relative text-purple-100/70">
                {feature.description}
              </p>

              {/* Hover shadow effect */}
              <div className="absolute inset-0 rounded-3xl shadow-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
