# WellDesk - Your Wellness Companion
<p align="center">
  <img src="https://github.com/user-attachments/assets/fea11b77-798f-4ebe-b08a-c5ef2bdee1e0" alt="WellDesk Logo" width="600">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/10b7fbc8-4441-44b9-8ecc-e8db02ed8aee" alt="WellDesk Interface" width="300">
</p>




## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Configuration](#configuration)
- [Technical Details](#technical-details)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

WellDesk is a Chrome extension designed to improve your workplace wellness by reminding you to take regular breaks throughout your workday. It helps combat the negative effects of prolonged sitting and screen time by encouraging movement and stretching at customizable intervals.

### Why WellDesk?
- **Sedentary lifestyle risks**: Prolonged sitting increases risk of cardiovascular disease, diabetes, and musculoskeletal problems
- **Eye strain prevention**: Regular breaks help reduce digital eye strain and fatigue
- **Productivity boost**: Studies show regular breaks improve focus and productivity
- **Mental wellness**: Short breaks help reduce stress and improve mental clarity

## ✨ Features

### Core Features
- **⏰ Customizable Break Reminders**: Set reminders from 5 to 180 minutes
- **🌙 Dark Mode Support**: Easy on the eyes during late work sessions
- **🎵 Ambient Sounds**: Built-in white noise, rain, nature, and fireplace sounds for focus
- **🔊 Volume Control**: Adjustable volume for ambient sounds
- **⏱️ Auto-Closing Reminders**: Break reminders close automatically after 30 seconds
- **🎨 Clean, Modern UI**: Intuitive interface that's easy to use

### Screenshot Gallery
![Main Popup Interface](screenshots/popup-main.png)
![Dark Mode View](screenshots/dark-mode.png)
![Break Reminder Window](screenshots/reminder-window.png)
![Sound Controls](screenshots/sound-controls.png)

## 📥 Installation Guide

### Method 1: Load as Unpacked Extension (Developer Mode)

1. **Download the Extension Files**
   - Clone this repository or download as ZIP
   - Extract to a folder on your computer (e.g., `C:\Users\YourName\Desktop\welldesk`)

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Type `chrome://extensions/` in the address bar and press Enter
   - Or click the three dots menu → More tools → Extensions

   ![Chrome Extensions Page](screenshots/chrome-extensions-page.png)

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner
   
   ![Developer Mode Toggle](screenshots/developer-mode.png)

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the WellDesk folder you extracted
   - Select the folder and click "Select Folder"
   
   ![Load Unpacked Button](screenshots/load-unpacked.png)

5. **Verify Installation**
   - You should see WellDesk appear in your extensions list
   - The WellDesk icon should appear in your Chrome toolbar
   - If not visible, click the puzzle piece icon and pin WellDesk
   
   ![Pin Extension](screenshots/pin-extension.png)

### Method 2: Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store soon for easier installation.

## 🚀 Usage

### Getting Started

1. **Click the WellDesk Icon**
   - Click the WellDesk icon in your Chrome toolbar
   - The popup will show the current status and settings

2. **Set Your Break Interval**
   - Use the slider to adjust break reminder frequency (5-180 minutes)
   - The extension immediately updates with your new setting
   - A success notification confirms the change

3. **Enable Dark Mode (Optional)**
   - Click the moon icon in the top right to toggle dark mode
   - Your preference is saved automatically

4. **Use Ambient Sounds (Optional)**
   - Select a sound from the dropdown (White Noise, Rain, Nature, Fireplace)
   - Click the play button to start
   - Adjust volume with the slider
   - Sound continues playing even when popup is closed

### Break Reminders

When it's time for a break:
- A popup window appears with your break reminder
- The window shows a 30-second countdown
- Press ESC or wait for the countdown to close the window
- Take this time to stand, stretch, walk around, or rest your eyes

![Break Reminder Example](screenshots/break-reminder-example.png)

## ⚙️ Configuration

### Customizable Settings

| Setting | Description | Range | Default |
|---------|-------------|-------|---------|
| Break Interval | Time between break reminders | 5-180 minutes | 30 minutes |
| Dark Mode | Toggle dark theme | On/Off | Off |
| Ambient Sound | Background noise type | White/Rain/Nature/Fire | White Noise |
| Volume | Sound volume level | 0-100% | 50% |

### Storage & Privacy
- All settings are stored locally using Chrome's sync storage
- No personal data is collected or transmitted
- Settings sync across devices when signed into Chrome

## 🔧 Technical Details

### Project Structure
```
welldesk/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── popup.html            # Main popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styling
├── reminder.html         # Break reminder window
├── reminder.js           # Reminder functionality
├── reminder.css          # Reminder styling
├── white-noise-processor.js  # Audio worklet for sound generation
├── noise.js              # Sound management (currently empty)
├── images/
│   └── logo3.png         # Extension icon
└── README.md             # This file
```

### Technologies Used
- **Chrome Extensions Manifest V3**: Latest extension platform
- **Web Audio API**: For ambient sound generation
- **AudioWorklet**: Modern audio processing (replaces deprecated ScriptProcessorNode)
- **Chrome Storage API**: For persistent settings
- **Chrome Alarms API**: For scheduled break reminders
- **Bootstrap Icons**: For UI icons

### Browser Compatibility
- Google Chrome 88+ (for AudioWorklet support)
- Microsoft Edge 88+ (Chromium-based)
- Other Chromium-based browsers may work but are untested

## 🔍 Troubleshooting

### Common Issues

**Extension doesn't appear after loading:**
- Ensure Developer Mode is enabled
- Check for errors in chrome://extensions/
- Try reloading the extension

**Break reminders not appearing:**
- Check if notifications are blocked for Chrome
- Ensure the extension has proper permissions
- Try disabling and re-enabling the extension

**Sound not playing:**
- Check system volume and Chrome tab volume
- Try refreshing the extension popup
- Ensure your browser supports Web Audio API

**Dark mode not working:**
- Refresh the popup after toggling
- Check if other extensions conflict with styling

### Debug Mode
1. Right-click the extension icon → "Inspect popup"
2. Check Console for any error messages
3. Go to chrome://extensions/ → Details → Inspect views: background page

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Development Setup
1. Clone the repository
2. Make your changes
3. Test in Chrome using Developer Mode
4. Ensure no console errors
5. Submit PR with description of changes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sound effects from Pixabay (CC0 License)
- Bootstrap Icons for UI elements
- Inspired by workplace wellness research

---

**Remember**: Your health is your wealth. Take regular breaks, stay hydrated, and keep moving! 💪

![Stay Healthy](screenshots/stay-healthy.png)
