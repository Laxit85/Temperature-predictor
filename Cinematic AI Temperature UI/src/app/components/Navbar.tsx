import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { CloudRain, LineChart, History, Info } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: CloudRain },
    { path: '/predict', label: 'Predict', icon: LineChart },
    { path: '/history', label: 'History', icon: History },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl bg-white/10 px-8 py-4 backdrop-blur-xl border border-white/20 shadow-2xl">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-75" />
                <div className="relative rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                  <CloudRain className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                TempAI
              </span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`relative px-6 py-2 rounded-xl transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-purple-100 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link to="/login">
            <motion.button
              className="relative overflow-hidden rounded-xl px-6 py-2.5 font-semibold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Get Started</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
