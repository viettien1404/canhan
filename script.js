// script.js - Optimized JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initVideoFallback();
    createSnow();
    createParticles();
    initMusicPlayer();
    initFpsCounter();
    updateTime();
});

// Video fallback in case video fails to load
function initVideoFallback() {
    const video = document.getElementById('bgVideo');
    const fallback = document.getElementById('videoFallback');
    
    video.addEventListener('error', function() {
        fallback.style.display = 'block';
    });
    
    // Check if video is actually playing
    setTimeout(function() {
        if (video.readyState < 3) { // HAVE_FUTURE_DATA
            fallback.style.display = 'block';
        }
    }, 3000);
}

// Create snow effect with performance optimization
function createSnow() {
    const snowContainer = document.getElementById('snow');
    const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❉'];
    const flakeCount = window.innerWidth < 480 ? 25 : 40; // Reduce on mobile
    
    for (let i = 0; i < flakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowContainer.appendChild(snowflake);
    }
}

// Create particles with performance optimization
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 480 ? 10 : 15; // Reduce on mobile
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// FPS counter
function initFpsCounter() {
    let lastTime = 0;
    let frameCount = 0;
    let currentFps = 0;

    function updateFps(time) {
        frameCount++;
        
        if (time >= lastTime + 1000) {
            currentFps = Math.round((frameCount * 1000) / (time - lastTime));
            document.getElementById('fps').textContent = currentFps;
            frameCount = 0;
            lastTime = time;
        }
        
        requestAnimationFrame(updateFps);
    }
    
    requestAnimationFrame(updateFps);
}

// Real-time clock
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('vi-VN');
    document.getElementById('time').textContent = timeStr;
    setTimeout(updateTime, 1000);
}

// Music player functionality
function initMusicPlayer() {
    const audio = new Audio();
    let isPlaying = false;
    
    // Set initial volume
    audio.volume = 1;
    
    // Music selection
    document.getElementById('musicSelect').addEventListener('change', function() {
        const song = this.value;
        if (song) {
            audio.src = `${song}.mp3`;
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
    });
    
    // Play/pause button
    document.getElementById('playBtn').addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play().then(() => {
                this.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error("Audio playback failed:", error);
            });
        }
        isPlaying = !isPlaying;
    });
    
    // Mute button
    document.getElementById('muteBtn').addEventListener('click', function() {
        audio.muted = !audio.muted;
        this.innerHTML = audio.muted 
            ? '<i class="fas fa-volume-mute"></i>'
            : '<i class="fas fa-volume-up"></i>';
    });
    
    // Volume slider
    document.getElementById('volumeSlider').addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Handle audio ending
    audio.addEventListener('ended', function() {
        isPlaying = false;
        document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Handle audio errors
    audio.addEventListener('error', function() {
        console.error("Error loading audio");
        isPlaying = false;
        document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
    });
}