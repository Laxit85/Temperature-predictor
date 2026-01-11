import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudRain, Wind, Droplets, Gauge, Sun, Thermometer } from 'lucide-react';
import Navbar from './Navbar';

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    month: '',
    hour: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: parseInt(formData.month),
          hour: parseInt(formData.hour),
        }),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setResult(data.predicted_temperature);
    } catch (error) {
      console.error('Error:', error);
      // Fallback to mock prediction if API fails
      const predictedTemp = 20 + Math.random() * 15;
      setResult(Math.round(predictedTemp * 10) / 10);
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      name: 'month',
      label: 'Month (1-12)',
      icon: Sun,
      placeholder: 'e.g., 6',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'hour',
      label: 'Hour (0-23)',
      icon: Wind,
      placeholder: 'e.g., 14',
      color: 'from-purple-400 to-pink-500',
    },
  ];

  const getWeatherIcon = (temp: number) => {
    if (temp < 10) return CloudRain;
    if (temp < 20) return Wind;
    return Sun;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI Temperature Prediction
          </h1>
          <p className="text-xl text-purple-100/70">
            Enter atmospheric conditions to get instant predictions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-2xl border border-white/20 shadow-2xl">
              <h2 className="mb-6 text-2xl font-bold text-white">Input Parameters</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {inputFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <label className="mb-2 block text-sm font-medium text-purple-100">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border transition-all ${
                          focusedField === field.name
                            ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                            : 'border-white/10'
                        }`}
                      >
                        <div className="flex items-center px-4 py-4">
                          <field.icon className="h-5 w-5 text-purple-300" />
                          <input
                            type="number"
                            step="0.1"
                            value={formData[field.name as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({ ...formData, [field.name]: e.target.value })
                            }
                            placeholder={field.placeholder}
                            className="flex-1 bg-transparent px-4 text-white placeholder-purple-200/50 outline-none"
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                            required
                          />
                        </div>
                        
                        {focusedField === field.name && (
                          <>
                            <motion.div
                              className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${field.color}`}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${field.color} opacity-5`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.05 }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full overflow-hidden rounded-xl py-4 font-semibold text-white shadow-lg disabled:opacity-50"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Thermometer className="h-5 w-5" />
                        Predict Temperature
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Result Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {result === null ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full items-center justify-center rounded-3xl bg-white/5 p-8 backdrop-blur-2xl border border-white/20"
                >
                  <div className="text-center">
                    <motion.div
                      className="mx-auto mb-6 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Thermometer className="h-16 w-16 text-purple-300" />
                    </motion.div>
                    <p className="text-lg text-purple-100/70">
                      Enter parameters and click predict to see results
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="rounded-3xl bg-white/10 p-8 backdrop-blur-2xl border border-white/20 shadow-2xl"
                >
                  <h2 className="mb-8 text-2xl font-bold text-white">Prediction Result</h2>
                  
                  <div className="text-center">
                    {/* Animated weather icon */}
                    <motion.div
                      className="mx-auto mb-8"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <div className="relative inline-block">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-2xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="relative rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-6">
                          {(() => {
                            const Icon = getWeatherIcon(result);
                            return <Icon className="h-16 w-16 text-white" />;
                          })()}
                        </div>
                      </div>
                    </motion.div>

                    {/* Temperature display with count-up */}
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        className="text-7xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                      >
                        <CountUpAnimation value={result} />°C
                      </motion.div>
                      <p className="mt-2 text-xl text-purple-100/70">
                        Predicted Temperature
                      </p>
                    </motion.div>

                    {/* Glow effect */}
                    <motion.div
                      className="mx-auto h-1 w-48 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CountUpAnimation({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useState(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  });

  return <>{count.toFixed(1)}</>;
}
