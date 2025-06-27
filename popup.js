document.addEventListener('DOMContentLoaded', () => {
    const intervalRange = document.getElementById('interval-range');
    const intervalValue = document.getElementById('interval-value');
    const statusText = document.getElementById('status-text');
    const successPopup = document.getElementById('success-popup');
    const settingsIcon = document.getElementById('settingsIcon');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Function to update the UI based on stored values
    function updateUI() {
        chrome.storage.sync.get(['interval'], (data) => {
            const interval = data.interval || 30; // Changed default to 30 minutes
            statusText.textContent = `Active - Every ${interval} minutes`;
            intervalRange.value = interval;
            intervalValue.textContent = `${interval} minutes`;
        });
    }

    // Function to show success popup
    function showSuccessPopup() {
        successPopup.classList.add('show');
        setTimeout(() => {
            successPopup.classList.remove('show');
        }, 2000);
    }

    // Handle interval change
    intervalRange.addEventListener('input', (event) => {
        const newInterval = parseInt(event.target.value);
        intervalValue.textContent = `${newInterval} minutes`;
        
        chrome.storage.sync.set({ interval: newInterval }, () => {
            // Recreate the alarm with new interval
            chrome.alarms.clear('welldesk-reminder', () => {
                chrome.alarms.create('welldesk-reminder', {
                    delayInMinutes: newInterval,
                    periodInMinutes: newInterval
                });
            });
            
            updateUI();
            showSuccessPopup();
        });
    });

    chrome.storage.sync.get(['darkMode'], (data) => {
        if (data.darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.replace('bi-moon-fill', 'bi-sun-fill');
        }
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        chrome.storage.sync.set({ darkMode: darkModeEnabled });

        darkModeToggle.classList.toggle('bi-moon-fill', !darkModeEnabled);
        darkModeToggle.classList.toggle('bi-sun-fill', darkModeEnabled);
    });

    // Remove audio variables and functions, replace with messaging
    const soundSelect = document.getElementById('sound-select');
    const volumeBar = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    const noiseToggle = document.getElementById('noise-toggle');

    // Get current sound status on popup open
    chrome.runtime.sendMessage({ action: 'getSoundStatus' }, (response) => {
        if (response.isPlaying) {
            noiseToggle.textContent = 'Pause Sound';
        }
        soundSelect.value = response.currentSound;
        volumeBar.value = response.currentVolume;
        volumeValue.textContent = response.currentVolume;
    });

    noiseToggle.addEventListener('click', async () => {
        chrome.runtime.sendMessage({ action: 'toggleSound' }, (response) => {
            noiseToggle.textContent = response.isPlaying ? 'Pause Sound' : 'Play Sound';
        });
    });

    volumeBar.addEventListener('input', e => {
        const value = e.target.value;
        volumeValue.textContent = value;
        chrome.runtime.sendMessage({ action: 'changeVolume', volume: parseInt(value) });
    });

    soundSelect.addEventListener('change', () => {
        chrome.runtime.sendMessage({ action: 'changeSound', sound: soundSelect.value });
    });

    // Motivation messages
    const motivationMessages = [
      {
        title: "Drink Water",
        message: "Staying hydrated helps your body function at its best.",
        benefit: "Why? Water boosts energy, focus, and overall health."
      },
      {
        title: "Stand Up & Move",
        message: "Sitting for long periods can harm your health.",
        benefit: "Why? Standing up improves circulation and reduces fatigue."
      },
      {
        title: "Sleep 8 Hours",
        message: "Quality sleep is essential for your mind and body.",
        benefit: "Why? Good sleep improves memory, mood, and productivity."
      },
      {
        title: "Take Deep Breaths",
        message: "Pause and breathe deeply to reduce stress.",
        benefit: "Why? Deep breathing calms your mind and lowers blood pressure."
      },
      {
        title: "Stretch Regularly",
        message: "Stretching prevents stiffness and boosts flexibility.",
        benefit: "Why? It helps prevent injury and improves posture."
      },
      {
        title: "Look Away from the Screen",
        message: "Give your eyes a break every 20 minutes.",
        benefit: "Why? Reduces eye strain and keeps your vision healthy."
      },
      {
        title: "Eat a Healthy Snack",
        message: "Choose fruits, nuts, or yogurt for sustained energy.",
        benefit: "Why? Healthy snacks fuel your brain and body."
      }
    ];

    function showRandomMotivation() {
      const idx = Math.floor(Math.random() * motivationMessages.length);
      const msg = motivationMessages[idx];
      document.getElementById('motivation-title').textContent = msg.title;
      document.getElementById('motivation-message').textContent = msg.message;
      document.getElementById('motivation-benefit').textContent = msg.benefit;
    }

    document.getElementById('motivation-next').addEventListener('click', showRandomMotivation);

    // Show a random message on popup open
    showRandomMotivation();

    // Update the UI when the popup is opened
    updateUI();
});