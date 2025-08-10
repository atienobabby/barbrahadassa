export interface Command {
  id: string;
  trigger: string[];
  action: string;
  description: string;
  category: 'system' | 'app' | 'communication' | 'media';
  requiresPermission?: string[];
}

export interface AIResponse {
  id: string;
  message: string;
  timestamp: number;
  type: 'user' | 'ai';
  action?: {
    type: string;
    target?: string;
    parameters?: Record<string, any>;
  };
}

export interface AppSettings {
  darkMode: boolean;
  contrast: number;
  voiceRecognition: boolean;
  aiMode: 'offline' | 'cloud' | 'local';
  apiKey?: string;
}

export interface CarouselCard {
  id: string;
  title: string;
  description: string;
  command: string;
  icon: string;
  color: string;
}