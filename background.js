let reminderWindowId = null;

chrome.runtime.onInstalled.addListener(() => {
  console.log("WellDesk extension installed.");
  chrome.storage.sync.set({
    interval: 30 // Changed default to 30 minutes
  }, () => {
    console.log("Setting initial alarm for 30 minutes");
    // Auto-start the algorithm with default 30-minute interval
    chrome.alarms.create('welldesk-reminder', {
      delayInMinutes: 30, // Changed to 30 minutes
      periodInMinutes: 30 // Changed to 30 minutes
    });
  });
});

// This listener fires when an alarm created by the extension goes off.
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm triggered:", alarm.name);
  if (alarm.name === "welldesk-reminder") {
    // Check if reminder window is already open
    if (reminderWindowId) {
      chrome.windows.get(reminderWindowId, (window) => {
        if (chrome.runtime.lastError || !window) {
          // Window was closed, create new one
          reminderWindowId = null;
          createReminderWindow();
        }
        // If window exists, don't create another one
      });
    } else {
      createReminderWindow();
    }
  }
});

function createReminderWindow() {
  chrome.storage.sync.get(['interval'], (data) => {
    const interval = data.interval || 30; // Changed default to 30 minutes
    console.log("Creating reminder popup for interval:", interval);
    chrome.windows.create({
      url: chrome.runtime.getURL('reminder.html'),
      type: 'popup',
      width: 400,
      height: 300,
      focused: true
    }, (window) => {
      reminderWindowId = window.id;
    });
  });
}

// Listen for window removal to clear the reminderWindowId
chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === reminderWindowId) {
    reminderWindowId = null;
  }
});

// Listen for storage changes to update alarms
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.interval) {
    const newInterval = changes.interval.newValue;
    console.log("Interval changed to:", newInterval);
    
    // Clear existing alarm
    chrome.alarms.clear('welldesk-reminder', () => {
      // Create new alarm with updated interval
      chrome.alarms.create('welldesk-reminder', {
        delayInMinutes: newInterval,
        periodInMinutes: newInterval
      });
      console.log("Alarm updated with new interval:", newInterval);
    });
  }
});

// Audio variables
let audioContext;
let audioSource;
let audioBuffer;
let gainNode;
let isPlaying = false;
let currentSound = 'white';
let currentVolume = 50;

const soundUrls = {
    'white': 'https://cdn.pixabay.com/download/audio/2025/01/30/audio_3355ff9be4.mp3?filename=relaxing-smoothed-brown-noise-294838.mp3',
    'rain': 'https://cdn.pixabay.com/download/audio/2024/10/30/audio_42e6870f29.mp3?filename=calming-rain-257596.mp3',
    'nature': 'https://cdn.pixabay.com/download/audio/2025/04/07/audio_a712b0769f.mp3?filename=nature-ambience-323729.mp3',
    'fire': 'https://cdn.pixabay.com/download/audio/2024/07/05/audio_cb6e14bf87.mp3?filename=fire-sound-222359.mp3'
};

async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

async function startSound() {
    if (!audioContext) {
        audioContext = new (self.AudioContext || self.webkitAudioContext)();
    }
    
    if (soundUrls[currentSound]) {
        audioBuffer = await loadSound(soundUrls[currentSound]);
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.loop = true;
        
        gainNode = audioContext.createGain();
        gainNode.gain.value = currentVolume / 100;
        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);
        audioSource.start();
    }
    isPlaying = true;
}

function stopSound() {
    if (audioSource) {
        audioSource.stop();
        audioSource.disconnect();
        audioSource = null;
    }
    if (gainNode) {
        gainNode.disconnect();
    }
    isPlaying = false;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleSound') {
        if (isPlaying) {
            stopSound();
        } else {
            startSound();
        }
        sendResponse({ isPlaying: !isPlaying });
    } else if (request.action === 'changeVolume') {
        currentVolume = request.volume;
        if (gainNode) {
            gainNode.gain.value = currentVolume / 100;
        }
    } else if (request.action === 'changeSound') {
        currentSound = request.sound;
        if (isPlaying) {
            stopSound();
            startSound();
        }
    } else if (request.action === 'getSoundStatus') {
        sendResponse({ isPlaying, currentSound, currentVolume });
    }
    return true;
});