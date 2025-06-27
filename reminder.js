let timeLeft = 30;
let countdownInterval = null;
let isCountdownStarted = false;

function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.textContent = timeLeft + 's';
    }
    
    if (timeLeft <= 0) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        closeWindow();
        return;
    }
    
    timeLeft--;
}

function startCountdown() {
    if (isCountdownStarted) return;
    isCountdownStarted = true;
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function closeWindow() {
    try {
        window.close();
    } catch (error) {
        console.log('Standard window.close() failed, trying alternative methods:', error);
        try {
            if (typeof chrome !== 'undefined' && chrome.windows) {
                chrome.windows.getCurrent((currentWindow) => {
                    if (currentWindow) {
                        chrome.windows.remove(currentWindow.id);
                    }
                });
            }
        } catch (chromeError) {
            console.log('Chrome API failed, hiding content:', chromeError);
            document.body.innerHTML = '<div style="padding: 50px; text-align: center;">Window closed</div>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Start countdown when page loads
    startCountdown();
    
    // Apply dark mode if enabled in storage
    chrome.storage.sync.get(['darkMode'], (data) => {
        if (data.darkMode) {
            document.body.classList.add('dark-mode');
        }
    });
});

// Fallback if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    startCountdown();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        closeWindow();
    }
});