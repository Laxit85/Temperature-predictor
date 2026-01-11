import { motion } from 'motion/react';
import { Trash2, Clock, Thermometer, Calendar } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';

const mockHistory = [
  { id: 1, date: '2024-12-24 14:30', inputs: { humidity: 65, pressure: 1013, windSpeed: 15 }, result: 24.5 },
  { id: 2, date: '2024-12-24 12:15', inputs: { humidity: 70, pressure: 1015, windSpeed: 12 }, result: 22.8 },
  { id: 3, date: '2024-12-24 09:45', inputs: { humidity: 75, pressure: 1012, windSpeed: 18 }, result: 20.3 },
  { id: 4, date: '2024-12-23 16:20', inputs: { humidity: 60, pressure: 1014, windSpeed: 10 }, result: 26.1 },
  { id: 5, date: '2024-12-23 11:10', inputs: { humidity: 68, pressure: 1016, windSpeed: 14 }, result: 23.7 },
  { id: 6, date: '2024-12-23 08:00', inputs: { humidity: 72, pressure: 1013, windSpeed: 16 }, result: 21.4 },
];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);

  const handleDelete = (id: number) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Prediction History
          </h1>
          <p className="text-xl text-purple-100/70">
            View and manage your past predictions
          </p>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Predictions', value: history.length, icon: Thermometer },
            { label: 'This Week', value: '12', icon: Calendar },
            { label: 'Avg Temperature', value: '23.5°C', icon: TrendingUp },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-2xl bg-white/10 p-6 backdrop-blur-xl border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100/70">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* History cards */}
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-6">
                  {/* Temperature display */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-0 transition-opacity group-hover:opacity-50"
                      whileHover={{ scale: 1.2 }}
                    />
                    <div className="relative rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-4">
                      <Thermometer className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-purple-100/70">
                      <Clock className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="text-4xl font-bold text-white">
                      {item.result}°C
                    </div>
                    <div className="mt-2 flex gap-4 text-sm text-purple-100/60">
                      <span>Humidity: {item.inputs.humidity}%</span>
                      <span>Pressure: {item.inputs.pressure} hPa</span>
                      <span>Wind: {item.inputs.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <motion.button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-xl bg-red-500/10 p-3 text-red-400 opacity-0 transition-all hover:bg-red-500/20 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Swipe indicator */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white/5 p-12 text-center backdrop-blur-xl border border-white/10"
          >
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Clock className="h-12 w-12 text-purple-300" />
            </div>
            <p className="text-xl text-purple-100/70">No prediction history yet</p>
            <p className="mt-2 text-purple-100/50">Start making predictions to see them here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M3 17l6-6 4 4 8-8m0 0l-4-4m4 4l-4 4" />
    </svg>
  );
}
