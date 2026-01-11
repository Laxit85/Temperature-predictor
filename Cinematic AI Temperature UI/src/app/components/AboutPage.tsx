import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Brain, Cpu, Database, Zap, TrendingUp, Shield } from 'lucide-react';
import Navbar from './Navbar';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const features = [
    {
      icon: Brain,
      title: 'Deep Learning Models',
      description: 'Advanced neural networks trained on millions of historical weather data points to predict temperature with high accuracy.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Cpu,
      title: 'Real-Time Processing',
      description: 'Lightning-fast computations powered by optimized algorithms that deliver instant predictions.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Comprehensive Dataset',
      description: 'Leveraging decades of meteorological data from thousands of weather stations worldwide.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Adaptive Learning',
      description: 'Our AI continuously learns and improves from new data, enhancing prediction accuracy over time.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: TrendingUp,
      title: 'Pattern Recognition',
      description: 'Sophisticated algorithms identify complex weather patterns and correlations invisible to traditional methods.',
      color: 'from-red-400 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Reliable & Accurate',
      description: 'Rigorously tested and validated models ensuring consistent, dependable temperature forecasts.',
      color: 'from-indigo-400 to-purple-500',
    },
  ];

  const timeline = [
    { year: '2020', title: 'Project Initiated', description: 'Started collecting and preprocessing weather data' },
    { year: '2021', title: 'Model Development', description: 'Developed and trained initial neural network models' },
    { year: '2022', title: 'Beta Testing', description: 'Conducted extensive testing with real-world scenarios' },
    { year: '2023', title: 'Public Launch', description: 'Launched platform to public with 94% accuracy' },
    { year: '2024', title: 'Continuous Improvement', description: 'Ongoing optimization and feature additions' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['0%', '50%']),
        }}
      >
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
      </motion.div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            About Our AI System
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-purple-100/70 leading-relaxed">
            Our temperature prediction system combines cutting-edge artificial intelligence
            with comprehensive meteorological data to deliver highly accurate forecasts.
            Built by experts, powered by innovation.
          </p>
        </motion.div>

        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            className="mb-12 text-center text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powered By Advanced AI
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Gradient glow on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 blur-2xl transition-opacity`}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Icon */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-50`} />
                  <div className={`relative inline-block rounded-2xl bg-gradient-to-br ${feature.color} p-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-purple-100/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            className="mb-12 text-center text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="w-5/12">
                  <motion.div
                    className={`rounded-2xl bg-white/10 p-6 backdrop-blur-xl border border-white/20 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`mb-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                      {item.year}
                    </div>
                    <h4 className="mb-2 text-xl font-semibold text-white">{item.title}</h4>
                    <p className="text-purple-100/70">{item.description}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2">
                  <motion.div
                    className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-purple-500/30"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    whileHover={{ scale: 1.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-12 text-center backdrop-blur-xl border border-white/20"
        >
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Experience AI-Powered Predictions?
          </h2>
          <p className="mb-8 text-xl text-purple-100/70">
            Join thousands of users who trust our platform for accurate temperature forecasts
          </p>
          <motion.button
            className="relative overflow-hidden rounded-xl px-12 py-4 text-lg font-bold text-white shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Get Started Now</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
