let cactus = document.getElementById("cactus")
let cactusPosition = 600;

function moveCactus() {
    cactusPosition -= 5;
    if (cactusPosition < - 20) cactusPosition = 600;
    cactus.style.left = cactusPosition + "px";
}

setInterval(moveCactus, 50)

