let currentJob = 
{
    title: "NEET",
    pay: 0
}

let message = 'Your current job is ' + currentJob.title;
alert(message);


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
  let statusPool;

  if(currentJob.title === "NEET")
  {
    //display job list and apply
    document.getElementById("jobListDiv").style.display = "block";
    let ul = document.getElementById("jobList");
    jobList.forEach(function(item)
    {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(item.title + " "));
      ul.appendChild(li);
      
      let button = document.createElement('button');
      button.appendChild(document.createTextNode("Apply?"));
      button.onclick = function()
      {
        console.log("button click");
        currentJob = item;
        document.getElementById("jobListDiv").style.display = "none";
      }

      li.appendChild(button);
    });

    statusPool = statusPools.workStatusesUnEmployed;
  }
  else
  {
    money += currentJob.pay;
    statusPool = statusPools.workStatusesEmployed;
    hunger = Math.min(10, hunger -1);
    hygiene = Math.min(10, hygiene -1);
  }
  ropeChance = Math.min(100, ropeChance + 5);
  updateUI(statusPool);
}

document.getElementById("WorkButton").onclick = workFunction;