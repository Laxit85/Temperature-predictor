import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import Navbar from './Navbar';

const mockLineData = [
  { time: '00:00', temp: 18.5, predicted: 19.0 },
  { time: '04:00', temp: 16.2, predicted: 16.8 },
  { time: '08:00', temp: 19.8, predicted: 20.2 },
  { time: '12:00', temp: 25.3, predicted: 24.8 },
  { time: '16:00', temp: 27.1, predicted: 26.5 },
  { time: '20:00', temp: 22.4, predicted: 23.0 },
];

const mockBarData = [
  { month: 'Jan', avgTemp: 15.2 },
  { month: 'Feb', avgTemp: 16.8 },
  { month: 'Mar', avgTemp: 19.3 },
  { month: 'Apr', avgTemp: 22.1 },
  { month: 'May', avgTemp: 25.7 },
  { month: 'Jun', avgTemp: 28.9 },
];

export default function ResultPage() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-slate-900/95 p-4 backdrop-blur-xl border border-purple-500/30 shadow-2xl"
        >
          {payload.map((entry: any, index: number) => (
            <div key={index} className="text-sm">
              <span className="font-medium text-purple-200">{entry.name}: </span>
              <span className="font-bold text-white">{entry.value}°C</span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Data Visualization
          </h1>
          <p className="text-xl text-purple-100/70">
            Explore temperature trends and prediction accuracy
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { label: 'Avg Accuracy', value: '94.7%', icon: Activity, color: 'from-green-400 to-emerald-500' },
            { label: 'Predictions Today', value: '127', icon: TrendingUp, color: 'from-blue-400 to-cyan-500' },
            { label: 'Models Running', value: '3', icon: Activity, color: 'from-purple-400 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white/10 p-6 backdrop-blur-2xl border border-white/20 shadow-2xl"
              whileHover={{ y: -5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`} />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm text-purple-100/70">{stat.label}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`rounded-2xl bg-gradient-to-br ${stat.color} p-3`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-2xl border border-white/20 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Temperature Trends</h2>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockLineData}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="time" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip content={<CustomTooltip />} />
              <motion.g
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#a855f7"
                  strokeWidth={3}
                  fill="url(#colorTemp)"
                  dot={{ fill: '#a855f7', r: 6 }}
                  activeDot={{ r: 8, fill: '#c084fc' }}
                  name="Actual"
                />
              </motion.g>
              <motion.g
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
              >
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#ec4899"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fill="url(#colorPredicted)"
                  dot={{ fill: '#ec4899', r: 6 }}
                  activeDot={{ r: 8, fill: '#f472b6' }}
                  name="Predicted"
                />
              </motion.g>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-2xl border border-white/20 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Monthly Averages</h2>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockBarData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#c4b5fd" />
              <YAxis stroke="#c4b5fd" />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="avgTemp"
                fill="url(#barGradient)"
                radius={[10, 10, 0, 0]}
                name="Avg Temp"
              >
                {mockBarData.map((_, index) => (
                  <motion.rect
                    key={index}
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
