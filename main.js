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
let health = 10;
let money = 0;
let happy = 0; // stays at 0
let ropeChance = 0;

// --- Update UI ---
function updateUI() {
  document.getElementById("Hunger").textContent = "Hunger: " + hunger;
  document.getElementById("Health").textContent = "Health: " + health;
  document.getElementById("MoneyCount").textContent = "Money: $" + money;
  document.getElementById("Happy").textContent = "Happy: " + happy;
  document.getElementById("RopeChance").textContent = "Ropechance: %" + ropeChance;
  document.getElementById("Status").textContent = "Status: " + getStatusLine();

  checkGameOver(); // check if ropeChance maxed out
}

// --- Quippy Status Lines ---
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
  health = Math.min(health + 5, 10);
  updateUI();
}

function play() {
  playClick();
  if (Math.random() < 0.7) {
    ropeChance = Math.max(0, ropeChance - 5);
  } else {
    ropeChance = Math.min(100, ropeChance + 2);
  }
  updateUI();
}

function workFunction() {
  playClick();
  if (Math.random() < 0.5) {
    money += 200;
  } else {
    document.getElementById("Status").textContent = "Status: still unemployed...";
  }
  ropeChance = Math.min(100, ropeChance + 5);
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
    health = Math.max(0, health - 1);
  }
  updateUI();
}, 300000); // 5 minutes

// Health decreases every 30 minutes
setInterval(() => {
  health = Math.max(0, health - 1);
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
