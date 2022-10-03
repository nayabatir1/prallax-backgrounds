const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
const BACKGROUND_IMG_WIDHT = 2400;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./image/layer-1.png";

const backgroundLayer2 = new Image();
backgroundLayer2.src = "./image/layer-2.png";

const backgroundLayer3 = new Image();
backgroundLayer3.src = "./image/layer-3.png";

const backgroundLayer4 = new Image();
backgroundLayer4.src = "./image/layer-4.png";

const backgroundLayer5 = new Image();
backgroundLayer5.src = "./image/layer-5.png";

let gameSpeed = 5;
// let gameFrame = 0;

const slider = document.getElementById("slider");
const gamespeed = document.getElementById("gamespeed");
gamespeed.textContent = gameSpeed;
slider.addEventListener("change", (e) => {
  gameSpeed = e.target.value;
  gamespeed.innerHTML = gameSpeed;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.x2 = BACKGROUND_IMG_WIDHT;
    this.image = image;
    this.speedModifier = speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -BACKGROUND_IMG_WIDHT) {
      this.x = 0;
    }

    this.x = Math.floor(this.x - this.speed);

    // alternate way of calculating x val
    // this.x = (gameFrame * this.speed) % BACKGROUND_IMG_WIDHT;

    this.draw();
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      BACKGROUND_IMG_WIDHT,
      CANVAS_HEIGHT
    );
    ctx.drawImage(
      this.image,
      this.x + BACKGROUND_IMG_WIDHT,
      this.y,
      BACKGROUND_IMG_WIDHT,
      CANVAS_HEIGHT
    );
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

  gameObjects.forEach((obj) => obj.update());
  // gameFrame--;

  requestAnimationFrame(animate);
}
animate();
