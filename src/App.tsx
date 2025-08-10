import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, Sparkles } from 'lucide-react';
import { useSettings } from './hooks/useSettings';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { CommandProcessor } from './services/commandProcessor';
import { Carousel } from './components/Carousel';
import { VoiceInput } from './components/VoiceInput';
import { ChatResponse } from './components/ChatResponse';
import { Settings } from './components/Settings';
import { AIResponse } from './types';

function App() {
  const { settings, updateSettings, isLoading } = useSettings();
  const speechRecognition = useSpeechRecognition();
  
  const [textInput, setTextInput] = React.useState('');
  const [responses, setResponses] = React.useState<AIResponse[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [commandProcessor] = React.useState(() => new CommandProcessor());

  // Update command processor when settings change
  React.useEffect(() => {
    if (commandProcessor) {
      commandProcessor['aiMode'] = settings.aiMode;
      commandProcessor['aiApiKey'] = settings.apiKey;
    }
  }, [settings.aiMode, settings.apiKey, commandProcessor]);

  // Handle speech recognition results
  React.useEffect(() => {
    if (speechRecognition.transcript && !speechRecognition.isListening) {
      handleSubmit(speechRecognition.transcript);
      speechRecognition.resetTranscript();
    }
  }, [speechRecognition.transcript, speechRecognition.isListening]);

  const handleSubmit = async (input?: string) => {
    const command = input || textInput;
    if (!command.trim() || isProcessing) return;

    // Add user message
    const userMessage: AIResponse = {
      id: Date.now().toString(),
      message: command,
      timestamp: Date.now(),
      type: 'user'
    };
    setResponses(prev => [...prev, userMessage]);

    setIsProcessing(true);
    setTextInput('');

    try {
      const response = await commandProcessor.processCommand(command);
      setResponses(prev => [...prev, response]);
    } catch (error) {
      console.error('Error processing command:', error);
      const errorResponse: AIResponse = {
        id: Date.now().toString(),
        message: 'Sorry, I encountered an error processing your command.',
        timestamp: Date.now(),
        type: 'ai'
      };
      setResponses(prev => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        settings.darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const backgroundStyle = {
    filter: `contrast(${settings.contrast}%)`,
    background: settings.darkMode
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  };

  return (
    <div className="min-h-screen transition-all duration-300" style={backgroundStyle}>
      <div className="min-h-screen backdrop-blur-sm bg-black/20 p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 pt-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                BarbraAI
              </h1>
              <p className="text-white/70 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Hadassah</span>
              </p>
            </div>
            
            <motion.button
              onClick={() => setShowSettings(true)}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SettingsIcon className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Carousel
              darkMode={settings.darkMode}
              onCommandSelect={(command) => {
                setTextInput(command);
                setTimeout(() => handleSubmit(command), 100);
              }}
            />
          </motion.div>

          {/* Voice Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <VoiceInput
              darkMode={settings.darkMode}
              isListening={speechRecognition.isListening}
              transcript={speechRecognition.transcript}
              textInput={textInput}
              isProcessing={isProcessing}
              onTextInputChange={setTextInput}
              onStartListening={speechRecognition.startListening}
              onStopListening={speechRecognition.stopListening}
              onSubmit={() => handleSubmit()}
              voiceEnabled={settings.voiceRecognition}
            />
          </motion.div>

          {/* Error Display */}
          {speechRecognition.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm"
            >
              Voice error: {speechRecognition.error}
            </motion.div>
          )}

          {/* Chat Responses */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChatResponse responses={responses} darkMode={settings.darkMode} />
          </motion.div>
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <Settings
            settings={settings}
            onUpdateSettings={updateSettings}
            darkMode={settings.darkMode}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;