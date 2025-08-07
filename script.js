const cactusContainer = document.getElementById("cactus");
const dino = document.getElementById("T-rex");
let lastCactusTime = 0;
const cactusInterval = 5000;

/* function moveCactus() {
    cactusPosition -= 5;
    if (cactusPosition < - 20) cactusPosition = 600;
    cactus.style.left = cactusPosition + "px";
}

setInterval(moveCactus, 50) */

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("cactus-obstacles");

    //Random height
    const height = Math.floor(Math.random() * 30) + 50;
    obstacle.style.height = height + "px";
    obstacle.style.left = "100%";

    cactusContainer.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let position = window.innerWidth;

    const interval = setInterval(() => {
        position -= 5;
        obstacle.style.left = position;

        // Remove when off screen
        if (position < -60) {
            obstacle.remove();
            clearInterval(interval)
        }


    }, 50);
}

function startObstacleLoop() {
    setInterval(() => {
        const now = Date.now();
        const timeSinceLast = now - lastCactusTime;

        if(Math.random() < 0.5 && timeSinceLast > cactusInterval) {
            createObstacle();
            lastCactusTime = now
        }
    }, 500); 
}

startObstacleLoop();

//Check collision 
let gameScore = 0;
document.getElementById("gameScore").innerHTML = gameScore;
let isCollison = setInterval(function () {
  //check dino position
  let dinoTop = window.getComputedStyle(dino).getPropertyValue("top");
  
  //check cactus position
  let cactusLeft = parseInt(window.getComputedStyle(cactusContainer).getPropertyValue("left"));
  console.log(cactusLeft);

  //detect collision 

  if ( cactusLeft < 50 && cactusLeft > 0 && dinoTop > 210 && dinoTop < 220){
    //display score
    alert(`Game Over! Your score ${gameScore}`);
  }else if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 220){
   gameScore = gameScore + 1;
  }
}, 10)