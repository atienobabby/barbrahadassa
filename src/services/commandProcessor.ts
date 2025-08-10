import { Browser } from '@capacitor/browser';
import { Toast } from '@capacitor/toast';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Command, AIResponse } from '../types';

// Predefined commands for instant keyword detection
export const COMMANDS: Command[] = [
  {
    id: 'open-whatsapp',
    trigger: ['open whatsapp', 'launch whatsapp', 'whatsapp'],
    action: 'open_app',
    description: 'Open WhatsApp application',
    category: 'app'
  },
  {
    id: 'open-youtube',
    trigger: ['open youtube', 'launch youtube', 'youtube'],
    action: 'open_app',
    description: 'Open YouTube application',
    category: 'app'
  },
  {
    id: 'search-youtube',
    trigger: ['search youtube for', 'youtube search'],
    action: 'search_youtube',
    description: 'Search YouTube for specific content',
    category: 'media'
  },
  {
    id: 'flashlight-on',
    trigger: ['turn on flashlight', 'flashlight on', 'torch on'],
    action: 'flashlight_on',
    description: 'Turn on device flashlight',
    category: 'system'
  },
  {
    id: 'flashlight-off',
    trigger: ['turn off flashlight', 'flashlight off', 'torch off'],
    action: 'flashlight_off',
    description: 'Turn off device flashlight',
    category: 'system'
  },
  {
    id: 'brightness-dim',
    trigger: ['dim brightness', 'reduce brightness', 'make dimmer'],
    action: 'brightness_dim',
    description: 'Reduce screen brightness',
    category: 'system'
  }
];

export class CommandProcessor {
  private aiApiKey?: string;
  private aiMode: 'offline' | 'cloud' | 'local' = 'offline';

  constructor(aiMode: 'offline' | 'cloud' | 'local' = 'offline', apiKey?: string) {
    this.aiMode = aiMode;
    this.aiApiKey = apiKey;
  }

  async processCommand(input: string): Promise<AIResponse> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Try keyword detection first (instant, offline)
    const keywordResult = this.detectKeyword(normalizedInput);
    if (keywordResult) {
      await this.executeAction(keywordResult.action, keywordResult);
      return {
        id: Date.now().toString(),
        message: `Executed: ${keywordResult.description}`,
        timestamp: Date.now(),
        type: 'ai',
        action: { type: keywordResult.action }
      };
    }

    // Fall back to AI processing
    if (this.aiMode === 'offline') {
      return this.processOfflineAI(input);
    } else if (this.aiMode === 'cloud') {
      return this.processCloudAI(input);
    } else {
      return this.processLocalAI(input);
    }
  }

  private detectKeyword(input: string): Command | null {
    for (const command of COMMANDS) {
      for (const trigger of command.trigger) {
        if (input.includes(trigger)) {
          return command;
        }
      }
    }
    return null;
  }

  private async executeAction(action: string, command?: Command, parameters?: any): Promise<void> {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });

      switch (action) {
        case 'open_app':
          if (command?.id === 'open-whatsapp') {
            await Browser.open({ url: 'https://web.whatsapp.com' });
          } else if (command?.id === 'open-youtube') {
            await Browser.open({ url: 'https://youtube.com' });
          }
          break;

        case 'search_youtube':
          const query = parameters?.query || 'trending';
          await Browser.open({ url: `https://youtube.com/results?search_query=${encodeURIComponent(query)}` });
          break;

        case 'flashlight_on':
          // Note: Real flashlight control requires native plugin
          await Toast.show({ text: 'Flashlight turned on (simulated)' });
          break;

        case 'flashlight_off':
          await Toast.show({ text: 'Flashlight turned off (simulated)' });
          break;

        case 'brightness_dim':
          await Toast.show({ text: 'Brightness reduced (simulated)' });
          break;

        default:
          await Toast.show({ text: 'Unknown command' });
      }
    } catch (error) {
      console.error('Error executing action:', error);
      await Toast.show({ text: 'Error executing command' });
    }
  }

  private async processOfflineAI(input: string): Promise<AIResponse> {
    // Simple offline AI simulation - pattern matching
    const responses = [
      "I understand you want me to help with that. In offline mode, I can only execute predefined commands.",
      "I'm running in offline mode. Try commands like 'open WhatsApp' or 'turn on flashlight'.",
      "Offline AI is limited. For advanced features, switch to Cloud or Local AI mode in settings."
    ];

    return {
      id: Date.now().toString(),
      message: responses[Math.floor(Math.random() * responses.length)],
      timestamp: Date.now(),
      type: 'ai'
    };
  }

  private async processCloudAI(input: string): Promise<AIResponse> {
    if (!this.aiApiKey) {
      return {
        id: Date.now().toString(),
        message: "Cloud AI requires an API key. Please configure it in settings.",
        timestamp: Date.now(),
        type: 'ai'
      };
    }

    try {
      // Simulate API call to Groq or OpenAI
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.aiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are BarbraAI, a helpful voice assistant. Parse user commands and respond naturally.'
            },
            {
              role: 'user',
              content: input
            }
          ],
          model: 'mixtral-8x7b-32768',
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return {
        id: Date.now().toString(),
        message: data.choices[0]?.message?.content || 'No response received',
        timestamp: Date.now(),
        type: 'ai'
      };
    } catch (error) {
      return {
        id: Date.now().toString(),
        message: "Sorry, I couldn't connect to the cloud AI service. Check your internet connection.",
        timestamp: Date.now(),
        type: 'ai'
      };
    }
  }

  private async processLocalAI(input: string): Promise<AIResponse> {
    try {
      // Connect to local Ollama instance
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `You are BarbraAI, a helpful voice assistant. Respond to: ${input}`,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Local AI connection failed');
      }

      const data = await response.json();
      return {
        id: Date.now().toString(),
        message: data.response || 'Local AI response unavailable',
        timestamp: Date.now(),
        type: 'ai'
      };
    } catch (error) {
      return {
        id: Date.now().toString(),
        message: "Local AI is not available. Make sure Ollama is running and accessible.",
        timestamp: Date.now(),
        type: 'ai'
      };
    }
  }
}