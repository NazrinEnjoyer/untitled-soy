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

// --- Update UI ---
function updateUI(statusPool) 
{
  document.getElementById("Hunger").textContent = "Hunger: " + hunger;
  document.getElementById("Hygiene").textContent = "Hygiene: " + hygiene;
  document.getElementById("MoneyCount").textContent = "Money: $" + money;
  document.getElementById("Happy").textContent = "Happy: " + happy;
  document.getElementById("RopeChance").textContent = "Ropechance: %" + ropeChance;
  document.getElementById("Status").textContent = "Status: " + getStatusLine(statusPool);

  checkGameOver(); // check if ropeChance maxed out
}

// --- Quippy Status Lines ---
function getStatusLine(statusPool) {
  const pool = statusPool;
  if (!pool || pool.length === 0)
  {
    return "Fuck my chud life";
  } 
  return pool[Math.floor(Math.random() * pool.length)];
}

const statusPools = {
  statuses: [    "just vibing...",
    "life is pain",
    "capitalism is a scam",
    "ate today, still sad",
    "dreaming of escape...",
    "billions must die...",
    "this time I'm really going to do it...",
    "It never even began...",
    "I wish I was gooning...",
    "I miss my computer...",
  ],
    workStatusesEmployed: [
    "I hate my job...",
    "boss gave pizza party..."
  ],
  workStatusesUnEmployed: [
    "Still unemployed..."
  ],
  playStatusesGood: [
    "Today I played on the swings!",
    "Had fun"
  ],
  playStatusesBad: [
    "Saw Stacy outside today...",
    "Cyberbullied"
  ],
  showerStatuses: [
    "Are daily showers really necessary?"
  ],
  feedStatusesGood: [
    "Yummy!"
  ],
  feedStatusesBad: [
    "Can't afford food..."
  ],
  brokeStatuses: [
    "BROKE! NIGGA! ALERT!"
  ]
};

// --- Actions ---
function feed() {
  playClick();
  let statusPool;
  if (money >= 50) {
    money -= 50;
    hunger = Math.min(hunger + 5, 10);
    statusPool = statusPools.feedStatusesGood;
  } else {
    ropeChance = Math.min(100, ropeChance + 5);
    statusPool = statusPools.feedStatusesBad;
  }
  updateUI(statusPool);
}

function shower() {
  playClick();
  hygiene = Math.min(hygiene + 5, 10);
  updateUI(statusPools.showerStatuses);
}

function play() {
  playClick();
  let statusPool;
  if (money >= 20) {
    money -= 20;

    // 70% chance ropeChance goes down, 30% chance it goes up slightly
    if (Math.random() < 0.7) {
      ropeChance = Math.max(0, ropeChance - 5);
      statusPool = statusPools.playStatusesGood;
    } else {
      ropeChance = Math.min(100, ropeChance + 2);
      statusPool = statusPools.playStatusesBad;
    }
  } else {
    // BROKE NIGGA ALERT
    ropeChance = Math.min(100, ropeChance + 5);
    statusPool.brokeStatuses
  }

  updateUI(statusPool);
}

function workFunction() {
  playClick();
  let statusPool;
  if (Math.random() < 0.5) {
    money += randomMath;
    statusPool = statusPools.workStatusesEmployed;
  } else {
    statusPool = statusPools.workStatusesUnEmployed;
  }
  ropeChance = Math.min(100, ropeChance + 5);
  hunger = Math.min(10, hunger -1);
  hygiene = Math.min(10, hygiene -1);
  updateUI(statusPool);
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

// --- RopeChance Penalty for Low Hygiene or Hunger ---
setInterval(() => {
  if (hunger < 5 || hygiene < 5) {
    ropeChance = Math.min(100, ropeChance + 5);
    updateUI();
  }
}, 60000); // every minute

// --- Setup ---
updateUI();
document.getElementById("FeedButton").onclick = feed;
document.getElementById("ShowerButton").onclick = shower;
document.getElementById("PlayButton").onclick = play;
document.getElementById("WorkButton").onclick = workFunction;