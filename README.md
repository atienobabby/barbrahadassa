# BarbraAI - Hybrid Voice Assistant

**Powered by Hadassah (Beauty with Brains)**

A fully-featured mobile voice assistant built with React, Capacitor, and hybrid AI processing. Runs natively on Android devices with offline keyword detection and optional AI-powered natural language processing.

## 🚀 Features

- **3D Carousel Interface** - Beautiful rotating command cards with depth effects
- **Hybrid Command Processing** - Instant offline keyword detection + AI modes
- **Voice Recognition** - Native speech-to-text with visual feedback
- **Native Android Integration** - Real device capabilities via Capacitor
- **Multi-AI Support** - Offline, Local (Ollama), and Cloud (Groq/OpenAI) modes
- **Dark/Light Theme** - Smooth theme transitions with contrast control
- **Settings Persistence** - All preferences saved locally

## 📱 Quick Start

### Prerequisites
- Node.js 18+ 
- Android Studio
- Java JDK 17+

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository>
cd barbra-ai
npm install
```

2. **Build for development**:
```bash
npm run build
npx cap sync
```

3. **Open in Android Studio**:
```bash
npx cap open android
```

4. **Enable USB Debugging** on your Vivo device:
   - Settings > About Phone > Tap "Build Number" 7 times
   - Settings > System > Developer Options > USB Debugging ON

5. **Deploy to device**:
   - Connect Vivo phone via USB
   - In Android Studio: Run > Run 'app'

## 🧠 Hybrid AI Logic

```
[User Voice/Text Command]
          |
          v
   [Keyword Detector] -- YES --> [Run Native Action via Capacitor API]
          |
          NO
          v
  [Send to AI Engine (Local or Cloud)]
          |
   AI parses intent into JSON:
   {
     "action": "open_whatsapp", 
     "target": "Mom",
     "message": "I'll be late"
   }
          |
          v
  [Execution Layer runs native action]
          |
          v
  [AI Responds or Confirms Action]
```

### Keyword Mode (Instant, Offline)
- "Open WhatsApp" → Launch WhatsApp
- "Search YouTube for cats" → Open YouTube search
- "Turn on flashlight" → Toggle device torch
- "Dim brightness" → Adjust screen brightness
- Works without internet connection

### AI Modes

#### 1. Offline AI (Default)
- Basic pattern matching
- No internet required
- Instant responses
- Limited to predefined responses

#### 2. Local AI (Ollama)
- Advanced natural language understanding
- Runs on local network
- Privacy-focused
- Requires Ollama setup

#### 3. Cloud AI (Groq/OpenAI)
- Most advanced AI capabilities
- Requires internet and API key
- Best natural language processing

## 🤖 Setting Up Local AI (Ollama)

### On Same Device Network:

1. **Install Ollama** on your PC/Mac:
```bash
# Mac
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows - Download from ollama.ai
```

2. **Download AI Model**:
```bash
ollama pull llama2  # 3.8GB
# or
ollama pull llama2:7b  # 3.8GB  
# or
ollama pull codellama:7b  # 3.8GB
```

3. **Start Ollama Server**:
```bash
ollama serve
```

4. **Find Your Local IP**:
```bash
# Mac/Linux
ifconfig | grep "inet "
# Windows
ipconfig
```

5. **Update App Configuration**:
   - In BarbraAI Settings → AI Mode → Local AI
   - Ollama will be accessible at `http://[YOUR_LOCAL_IP]:11434`

### Testing Local AI:
```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama2",
    "prompt": "You are BarbraAI. Say hello!",
    "stream": false
  }'
```

## ☁️ Setting Up Cloud AI

### Groq API (Recommended - Fast & Free Tier):

1. **Get API Key**:
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up and create API key

2. **Configure in App**:
   - Settings → AI Mode → Cloud AI
   - Enter your Groq API key
   - Available models: `mixtral-8x7b-32768`, `llama2-70b-4096`

### OpenAI API:

1. **Get API Key**:
   - Visit [platform.openai.com](https://platform.openai.com/api-keys)
   - Create API key ($5+ credit required)

2. **Configure in App**:
   - Settings → AI Mode → Cloud AI  
   - Enter OpenAI API key
   - Uses GPT-3.5-turbo by default

## 🔧 Customizing Commands

### Adding New Keywords:

Edit `src/services/commandProcessor.ts`:

```typescript
export const COMMANDS: Command[] = [
  // ... existing commands
  {
    id: 'open-spotify',
    trigger: ['open spotify', 'launch spotify', 'play music'],
    action: 'open_app',
    description: 'Open Spotify application',
    category: 'app'
  }
];
```

### Adding New Actions:

In `executeAction()` method:

```typescript
case 'open_spotify':
  await Browser.open({ url: 'https://open.spotify.com' });
  break;
```

### Adding AI-Powered Commands:

The AI modes can understand natural language and convert to actions:
- "Send a message to Mom saying I'm running late"
- "Play some relaxing music"  
- "What's the weather like today?"

## 📱 Deploy to Vivo Phones

### Vivo V20 & Vivo Y15s Specific Steps:

1. **Enable Developer Mode**:
   - Settings → About Phone
   - Tap "Software Version" 7 times
   - Settings → Additional Settings → Developer Options

2. **Enable USB Debugging**:
   - Developer Options → USB Debugging ON
   - USB Debugging (Security Settings) ON

3. **Allow Unknown Sources**:
   - Settings → Security → Unknown Sources → Allow

4. **Connect & Deploy**:
```bash
# Build production APK
npm run build
npx cap copy android
npx cap open android

# In Android Studio:
# Build → Generate Signed Bundle/APK → APK
# Install on device via USB
```

5. **Test Installation**:
   - Install APK on Vivo device
   - Grant microphone permissions when prompted
   - Test voice recognition: "Open WhatsApp"

## 🎨 UI Customization

### Changing Carousel Cards:

Edit `src/components/Carousel.tsx`:

```typescript
const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: '1',
    title: 'Custom Command',
    description: 'Your custom description',
    command: 'Your voice command',
    icon: 'IconName',
    color: 'from-blue-400 to-purple-600'
  }
  // ... more cards
];
```

### Theme Colors:

Update `src/App.tsx` background gradients:

```typescript
const backgroundStyle = {
  background: settings.darkMode
    ? 'linear-gradient(135deg, #your-dark-colors)'
    : 'linear-gradient(135deg, #your-light-colors)'
};
```

## 🔍 Troubleshooting

### Voice Recognition Issues:
- Grant microphone permissions
- Test in Chrome browser first
- Check Android permissions in Settings

### Local AI Connection:
- Ensure Ollama is running: `ollama list`
- Check firewall allows port 11434
- Verify network connectivity

### Build Errors:
```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
npx cap sync android
```

### Vivo-Specific Issues:
- Disable power optimization for BarbraAI
- Allow auto-start in App Management
- Check microphone permissions in Security Center

## 📋 Available Commands

### System Commands (Offline):
- "Turn on/off flashlight"
- "Dim/brighten screen"  
- "Open [app name]"
- "Search YouTube for [query]"

### AI Commands (Local/Cloud):
- Natural conversation
- Complex multi-step requests
- Context-aware responses
- Intent parsing and execution

## 🔒 Privacy & Security

- **Offline Mode**: No data leaves device
- **Local AI**: Data stays on local network
- **Cloud AI**: Encrypted API calls only
- **Settings**: Stored locally on device
- **Permissions**: Only request necessary access

## 🚀 Performance Tips

- Use Offline mode for fastest responses
- Local AI provides good balance of speed/capability
- Cloud AI for most advanced features
- Optimize carousel animation on slower devices

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using React, Capacitor, and the power of Hadassah**

For issues and feature requests, please create a GitHub issue.