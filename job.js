const currentJob = 
{
    title: "NEET",
    pay: 0
}

const jobList = [
  testJob = 
  {
    title: "Test Job",
    pay: 5
  },
  burgerFlipper = 
  {
    title: "Burger Flipper",
    pay: 10
  }
]

function workFunction() {
  playClick();

  if(currentJob.title === "NEET")
  {
    //display job list and apply
  }
  else
  {
    let statusPool;
    if (Math.random() < 0.5) 
    {
      money += randomMath;
      statusPool = statusPools.workStatusesEmployed;
    } 
  else 
  {
    statusPool = statusPools.workStatusesUnEmployed;
  }
  ropeChance = Math.min(100, ropeChance + 5);
  hunger = Math.min(10, hunger -1);
  hygiene = Math.min(10, hygiene -1);
  updateUI(statusPool);
  }
}

document.getElementById("WorkButton").onclick = workFunction;