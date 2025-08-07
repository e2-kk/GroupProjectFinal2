const character = document.getElementById("T-rex");
const obstacle = document.getElementById("cactus");

let jumping = false;

function jump() {
    dino.classList.add("jump")
    if (jumping) return;
    jumping - true;
     setTimeout(function () {
        dino.classList.remove("jump");
    }, 300)
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump();
  }
});