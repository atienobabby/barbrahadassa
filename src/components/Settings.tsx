import React from 'react';
import { motion } from 'framer-motion';
import { AppSettings } from '../types';
import { Moon, Sun, Mic, MicOff, Cloud, Wifi, WifiOff, ArrowLeft } from 'lucide-react';

interface SettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  darkMode: boolean;
  onClose: () => void;
}

export function Settings({ settings, onUpdateSettings, darkMode, onClose }: SettingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed inset-0 z-50 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } p-6 overflow-y-auto`}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={onClose}
            className={`p-3 rounded-xl ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } shadow-lg transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <h1 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Settings
          </h1>
          
          <div className="w-12" />
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon className="w-6 h-6 text-blue-400" />
                ) : (
                  <Sun className="w-6 h-6 text-yellow-500" />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Theme
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {darkMode ? 'Dark mode' : 'Light mode'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => onUpdateSettings({ darkMode: !settings.darkMode })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{
                    x: settings.darkMode ? 24 : 0
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* Contrast Slider */}
          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Contrast: {settings.contrast}%
            </h3>
            <input
              type="range"
              min="50"
              max="150"
              value={settings.contrast}
              onChange={(e) => onUpdateSettings({ contrast: parseInt(e.target.value) })}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
              style={{
                background: `linear-gradient(to right, ${
                  darkMode ? '#374151' : '#e5e7eb'
                } 0%, ${
                  darkMode ? '#3b82f6' : '#3b82f6'
                } ${((settings.contrast - 50) / 100) * 100}%, ${
                  darkMode ? '#374151' : '#e5e7eb'
                } ${((settings.contrast - 50) / 100) * 100}%)`
              }}
            />
          </motion.div>

          {/* Voice Recognition */}
          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.voiceRecognition ? (
                  <Mic className="w-6 h-6 text-green-500" />
                ) : (
                  <MicOff className="w-6 h-6 text-red-500" />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Voice Recognition
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {settings.voiceRecognition ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => onUpdateSettings({ voiceRecognition: !settings.voiceRecognition })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.voiceRecognition ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{
                    x: settings.voiceRecognition ? 24 : 0
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* AI Mode */}
          <motion.div
            className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-lg`}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              AI Mode
            </h3>
            
            <div className="space-y-3">
              {[
                { value: 'offline', label: 'Offline', icon: WifiOff, desc: 'Basic keyword detection' },
                { value: 'local', label: 'Local AI', icon: Wifi, desc: 'Ollama on local network' },
                { value: 'cloud', label: 'Cloud AI', icon: Cloud, desc: 'Advanced AI processing' }
              ].map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <button
                    key={mode.value}
                    onClick={() => onUpdateSettings({ aiMode: mode.value as any })}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      settings.aiMode === mode.value
                        ? darkMode
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-blue-500 bg-blue-50'
                        : darkMode
                          ? 'border-gray-600 bg-gray-700/50'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-5 h-5 ${
                        settings.aiMode === mode.value
                          ? 'text-blue-500'
                          : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                      <div className="text-left">
                        <p className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {mode.label}
                        </p>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {mode.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* API Key for Cloud AI */}
          {settings.aiMode === 'cloud' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              } shadow-lg`}
            >
              <h3 className={`font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                API Key
              </h3>
              <input
                type="password"
                value={settings.apiKey || ''}
                onChange={(e) => onUpdateSettings({ apiKey: e.target.value })}
                placeholder="Enter your Groq or OpenAI API key"
                className={`w-full px-4 py-3 rounded-xl border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}