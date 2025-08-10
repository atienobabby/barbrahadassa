import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  darkMode: boolean;
  isListening: boolean;
  transcript: string;
  textInput: string;
  isProcessing: boolean;
  onTextInputChange: (value: string) => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSubmit: () => void;
  voiceEnabled: boolean;
}

export function VoiceInput({
  darkMode,
  isListening,
  transcript,
  textInput,
  isProcessing,
  onTextInputChange,
  onStartListening,
  onStopListening,
  onSubmit,
  voiceEnabled
}: VoiceInputProps) {
  const displayValue = transcript || textInput;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={`relative rounded-2xl ${
      darkMode 
        ? 'bg-gray-800/50 border border-gray-700/50' 
        : 'bg-white/50 border border-gray-200/50'
    } backdrop-blur-xl p-4 shadow-xl`}>
      
      {/* Voice visualization */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 flex space-x-1"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
                animate={{
                  height: [4, 20, 4],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={displayValue}
            onChange={(e) => onTextInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : "Type a command or use voice..."}
            className={`w-full min-h-[60px] max-h-32 resize-none rounded-xl border-0 ${
              darkMode 
                ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                : 'bg-gray-100/50 text-gray-900 placeholder-gray-500'
            } px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
            disabled={isListening || isProcessing}
          />
        </div>

        <div className="flex flex-col space-y-2">
          {/* Voice button */}
          {voiceEnabled && (
            <motion.button
              onClick={isListening ? onStopListening : onStartListening}
              disabled={isProcessing}
              className={`p-3 rounded-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                  : darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </motion.button>
          )}

          {/* Send button */}
          <motion.button
            onClick={onSubmit}
            disabled={!displayValue.trim() || isProcessing}
            className={`p-3 rounded-xl transition-all ${
              displayValue.trim() && !isProcessing
                ? darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                : darkMode
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-300 text-gray-400'
            }`}
            whileHover={displayValue.trim() ? { scale: 1.05 } : {}}
            whileTap={displayValue.trim() ? { scale: 0.95 } : {}}
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Status indicator */}
      <AnimatePresence>
        {(isListening || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-3 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            } flex items-center space-x-2`}
          >
            <div className={`w-2 h-2 rounded-full ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 animate-pulse'
            }`} />
            <span>
              {isListening ? 'Listening for your command...' : 'Processing your request...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}