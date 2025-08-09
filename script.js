const dino = document.getElementById("dino");
const cactusContainer = document.getElementById("cactus");
let speedMultiplier = 1; // Speed of cactus at start
let startTime = Date.now(); //timing
let lastCactusTime = 0;
const cactusInterval = 500;
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
    }, 1500)
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump();
  }
});

let isJumping = false;
let velocity = 0;
const gravity = 0.2;
let dinoBottom = 0;
const jumpStrength = 8;

function jump() {
  if (isJumping) return;

  isJumping = true;
  velocity = jumpStrength;
}

function updateDino() {
  if (isJumping) {
    velocity -= gravity;
    dinoBottom += velocity;

    if (dinoBottom <= 0) {
      dinoBottom = 0;
      isJumping = false;
    }

    dino.style.bottom = dinoBottom + "px";
  }

  requestAnimationFrame(updateDino);
}

updateDino();

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

        // Increase position decrement by multiplier
        position -= 20 * speedMultiplier;
        obstacle.style.left = position + "px";

        if (position < -100) {
            obstacle.remove();
            clearInterval(interval);
        }
    }, 50);
}

function increaseSpeedOverTime() {
    setInterval(() => {
        if (gameOver) return;

        // Increase speed multiplier slightly over time
        speedMultiplier += 0.15;
        if (speedMultiplier > 4) speedMultiplier = 4;
    }, 2000); 
}

increaseSpeedOverTime();

// Start cactus loop

function startObstacleLoop() {
    setInterval(() => {
        const now = Date.now();
        const timeSinceLast = now - lastCactusTime;

        if(Math.random() < 0.5 && timeSinceLast > cactusInterval) {
            createObstacle();
            lastCactusTime = now
        }
    }, 200); 
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
      input =window.prompt(`Would you like to try again? Type yes if so.`);
      if (input === null || input === 'no' || input === 'No' || input === "NO")
      window.alert('Thank you for playing :). Please press "F5" if you would like to play again.');
      else if (input === 'Yes' || input === 'yes' || input ==='YES')
      window.location.reload();
      else {
        window.alert('Please answer yes or no.');
      } 
      
  
    } else if (obstacle.dataset.scored === "false" && obstacleRect.right < dinoRect.left) {
      // Dino jumped over it successfully
      gameScore++;
      document.getElementById("gameScore").innerHTML = gameScore;
      obstacle.dataset.scored = "true";
    }
  });
}, 20);


