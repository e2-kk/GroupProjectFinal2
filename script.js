const cactusContainer = document.getElementById("cactus")
let lastCactusTime = 0;
const cactusInterval = 5000;

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
        position -= 5; /* increase px for faster steps  */
        obstacle.style.left = position + "px";

        // Remove when off screen
        if (position < -60) {
            obstacle.remove();
            clearInterval(interval)
        }


    }, 50); /* or increase here to update more often */
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
