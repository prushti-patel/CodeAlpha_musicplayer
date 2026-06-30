const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const art = document.getElementById("art");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        art.classList.add("rotating");
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        art.classList.remove("rotating");
    }
});

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    progress.value = (currentTime / duration) * 100;
    
    // Update Time Display
    let mins = Math.floor(currentTime / 60);
    let secs = Math.floor(currentTime % 60);
    currentTimeEl.innerText = `${mins}:${secs < 10 ? '0'+secs : secs}`;
    
    if (duration) {
        let totalMins = Math.floor(duration / 60);
        let totalSecs = Math.floor(duration % 60);
        totalDurationEl.innerText = `${totalMins}:${totalSecs}`;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

const playlistItems = document.querySelectorAll("#playlist li");

playlistItems.forEach(item => {
    item.addEventListener("click", () => {
        audio.src = item.getAttribute("data-src");
        audio.play();
        playBtn.innerText = "⏸";
    });
});