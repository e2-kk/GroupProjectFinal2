const dino = document.getElementById("dino");
const cactusContainer = document.getElementById("cactus");

let lastCactusTime = 0;
const cactusInterval = 5000;
let gameScore = 0;
let gameOver = false;


// Handle jump
let jumping = false;

function jump() {
    if (jumping) return;
    jumping = true;
    dino.classList.add("jump")
     setTimeout(()  => {
        dino.classList.remove("jump");
        jumping = false;
    }, 300)
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump();
  }
});

// Obstacle creation

function createObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("cactus-obstacles");

    //Random height
    const height = Math.floor(Math.random() * 20) + 40;
    obstacle.style.height = height + "px";
    obstacle.style.left = "100%";
    obstacle.dataset.scored = "false";

    cactusContainer.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let position = window.innerWidth;

    const interval = setInterval(() => {
        if (gameOver) {
            clearInterval(interval);
            obstacle.remove();
            return;
        }

        position -= 5; /* increase px for faster steps  */
        obstacle.style.left = position + "px";

        // Remove when off screen
        if (position < -60) {
            obstacle.remove();
            clearInterval(interval)
        }
    }, 50);
}

// Start cactus loop

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

// collision + score 
document.getElementById("gameScore").innerHTML = gameScore;

setInterval(() => {
    if (gameOver) return;

    const dinoRect = dino.getBoundingClientRect();

// get all current obstacles
const obstacles = document.querySelectorAll(".cactus-obstacles");
obstacles.forEach(obstacle => {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.left < obstacleRect.right &&
      dinoRect.right > obstacleRect.left &&
      dinoRect.bottom > obstacleRect.top &&
      dinoRect.top < obstacleRect.bottom
    ) {
   gameOver = true;
      alert(`Game over! Your score: ${gameScore}`);
      window.location.reload();
    } else if (obstacle.dataset.scored === "false" && obstacleRect.right < dinoRect.left) {
      // Dino jumped over it successfully
      gameScore++;
      document.getElementById("gameScore").innerHTML = gameScore;
      obstacle.dataset.scored = "true";
    }
  });
}, 20);
