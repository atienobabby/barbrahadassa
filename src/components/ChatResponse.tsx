import React from 'react';
import { motion } from 'framer-motion';
import { AIResponse } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatResponseProps {
  responses: AIResponse[];
  darkMode: boolean;
}

export function ChatResponse({ responses, darkMode }: ChatResponseProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [responses]);

  if (responses.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`max-h-64 overflow-y-auto space-y-3 rounded-2xl ${
        darkMode 
          ? 'bg-gray-800/30 border border-gray-700/30' 
          : 'bg-white/30 border border-gray-200/30'
      } backdrop-blur-xl p-4`}
    >
      {responses.slice(-5).map((response) => (
        <motion.div
          key={response.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`flex items-start space-x-3 ${
            response.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            response.type === 'user'
              ? darkMode ? 'bg-blue-600' : 'bg-blue-500'
              : darkMode ? 'bg-purple-600' : 'bg-purple-500'
          }`}>
            {response.type === 'user' ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
          
          <div className={`flex-1 max-w-[80%] ${response.type === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block rounded-2xl px-4 py-3 ${
              response.type === 'user'
                ? darkMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-white text-gray-900 border border-gray-200'
            } shadow-lg`}>
              <p className="text-sm leading-relaxed">{response.message}</p>
              
              {response.action && (
                <div className={`mt-2 text-xs ${
                  response.type === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'
                } flex items-center space-x-1`}>
                  <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                  <span>Action executed: {response.action.type}</span>
                </div>
              )}
            </div>
            
            <div className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {new Date(response.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}