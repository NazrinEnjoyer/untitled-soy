// --- Sounds ---
const click1 = new Audio("sounds/click1.mp3");
const click2 = new Audio("sounds/click2.mp3");

function playClick() {
  const sound = Math.random() < 0.5 ? click1 : click2;
  sound.currentTime = 0; // rewind if spam-clicked
  sound.play();
}

// --- Music Player ---
const tracks = 
[
  { name: "Track 1", file: "sounds/track1.mp3" },
  { name: "Track 2", file: "sounds/track2.mp3" },
  { name: "Track 3", file: "sounds/track3.mp3" }
];

let currentTrackIndex = 0;
let audioPlayer = new Audio(tracks[currentTrackIndex].file);
audioPlayer.volume = 0.2;
audioPlayer.loop = true;
audioPlayer.play();

const trackNameDisplay = document.getElementById("trackName");
trackNameDisplay.textContent = tracks[currentTrackIndex].name;

document.getElementById("nextTrack").onclick = () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  switchTrack();
};

document.getElementById("prevTrack").onclick = () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  switchTrack();
};

function switchTrack() {
  audioPlayer.pause();
  audioPlayer = new Audio(tracks[currentTrackIndex].file);
  audioPlayer.volume = 0.5;
  audioPlayer.loop = true;
  audioPlayer.play();
  trackNameDisplay.textContent = tracks[currentTrackIndex].name;
}
// --- Volume Slider ---
const volumeSlider = document.getElementById("volumeSlider");

// Set initial volume
audioPlayer.volume = volumeSlider.value / 100;

// Update volume in real time
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value / 100;
});