import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  contrast: 100,
  voiceRecognition: true,
  aiMode: 'offline'
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { value } = await Preferences.get({ key: 'barbraai-settings' });
      if (value) {
        const savedSettings = JSON.parse(value);
        setSettings({ ...DEFAULT_SETTINGS, ...savedSettings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      await Preferences.set({
        key: 'barbraai-settings',
        value: JSON.stringify(updatedSettings)
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return {
    settings,
    updateSettings,
    isLoading
  };
}