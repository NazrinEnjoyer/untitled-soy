// --- Sounds ---
const click1 = new Audio("sounds/click1.mp3");
const click2 = new Audio("sounds/click2.mp3");

function playClick() {
  const sound = Math.random() < 0.5 ? click1 : click2;
  sound.currentTime = 0; // rewind if spam-clicked
  sound.play();
}

// --- Initial Stats ---
let hunger = 10;
let hygiene = 10;
let money = 0;
let happy = 0; // stays at 0
let ropeChance = 0;

// --- Wagie Math

let mathMin = 20;
let mathMax = 60;
let randomMath = Math.floor(Math.random() * (mathMax - mathMin + 1)) + mathMin;
let message = 'Your Wage is $' + randomMath + ' Per Shift';

alert(message);

/* // -- Restart Button --
function restart() {
hunger = 10;
hygiene = 10;
money = 0;
happy = 0; // stays at 0
ropeChance = 0;
} */
// --- RopeChance Penalty for Low Hygiene or Hunger ---
setInterval(() => {
  if (hunger < 5 || hygiene < 5) {
    ropeChance = Math.min(100, ropeChance + 5);
    updateUI();
  }
}, 60000); // every minute

// --- Update UI ---
function updateUI() {
  document.getElementById("Hunger").textContent = "Hunger: " + hunger;
  document.getElementById("Hygiene").textContent = "hygiene: " + hygiene;
  document.getElementById("MoneyCount").textContent = "Money: $" + money;
  document.getElementById("Happy").textContent = "Happy: " + happy;
  document.getElementById("RopeChance").textContent = "Ropechance: %" + ropeChance;
  document.getElementById("Status").textContent = "Status: " + getStatusLine();

  checkGameOver(); // check if ropeChance maxed out
}

// --- Stupid Status Lines ---
function getStatusLine() {
  const statuses = [
    "just vibing...",
    "life is pain",
    "capitalism is a scam",
    "ate today, still sad",
    "boss gave pizza party...",,
    "dreaming of escape...",
    "billions must die...",
    "this time I'm really going to do it...",
    "fuck my chud life",
    "I'm so based...",
    "...why won't she text back?",
    "It never even began...",
    "I wish I was gooning...",
    "I miss my computer...",
    "I want to kill myself...",
    
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// --- Actions ---
function feed() {
  playClick();
  if (money >= 50) {
    money -= 50;
    hunger = Math.min(hunger + 5, 10);
  } else {
    ropeChance = Math.min(100, ropeChance + 5);
  }
  updateUI();
}

function shower() {
  playClick();
  hygiene = Math.min(hygiene + 5, 10);
  updateUI();
}

function play() {
  playClick();
  if (money >= 20) {
    money -= 20;

    // 70% chance ropeChance goes down, 30% chance it goes up slightly
    if (Math.random() < 0.7) {
      ropeChance = Math.max(0, ropeChance - 5);
      alert("had fun");
    } else {
      ropeChance = Math.min(100, ropeChance + 2);
      alert("cyberbullied..");
    }
  } else {
    // BROKE NIGGA ALERT
    ropeChance = Math.min(100, ropeChance + 5);
    alert("BROKE! NIGGA! ALERT!");
  }

  updateUI();
}


function workFunction() {
  playClick();
  if (Math.random() < 0.5) {
    money += randomMath;
  } else {
    document.getElementById("Status").textContent = "Status: still unemployed...";
  }
  ropeChance = Math.min(100, ropeChance + 5);
  hunger = Math.min(10, hunger -1);
  hygiene = Math.min(10, hygiene -1);
  updateUI();
}

// --- Game Over ---
function checkGameOver() {
  if (ropeChance >= 100) {
    ropeChance = 100;
    document.getElementById("wojak").src = "jaks/rope100.png";
    document.getElementById("game-over").style.display = "block";

    // disable all action buttons
    document.querySelectorAll("#actions button").forEach(btn => {
      btn.disabled = true;
    });
  }
}

// --- Passive decay ---
// Hunger decreases every 5 minutes
setInterval(() => {
  hunger = Math.max(0, hunger - 1);
  if (hunger === 0) {
    hygiene = Math.max(0, hygiene - 1);
  }
  updateUI();
}, 300000); // 5 minutes

// hygiene decreases every 30 minutes
setInterval(() => {
  hygiene = Math.max(0, hygiene - 1);
  updateUI();
}, 1800000); // 30 minutes

// Paycheck every 24 hours
setInterval(() => {
  money += 1000;
  updateUI();
}, 86400000); // 24 hours

// --- Setup ---
updateUI();
document.getElementById("FeedButton").onclick = feed;
document.getElementById("ShowerButton").onclick = shower;
document.getElementById("PlayButton").onclick = play;
document.getElementById("WorkButton").onclick = workFunction;

// --- Music Player ---
const tracks = [
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
