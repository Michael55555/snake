import "./style.css";

let ctx;
const gap = 5;
const size = 20;

const snake = [
  [5, 5],
  [6, 5],
  [7, 5],
];
let dy = 1;
let dx = 0;
let apple = null;

function init() {
  const canvas = document.querySelector("canvas");
  const buttons = document.querySelectorAll("button");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  ctx = canvas.getContext("2d");
  ctx.strokeStyle = "white";
  ctx.fillStyle = "orange";
  spawnApple();

  Array.from(buttons).forEach((button, i) => {
    button.addEventListener("click", () => {
      if (i == 0 && dy !== 1) {
        dy = -1;
        dx = 0;
      }
      if (i == 1 && dx !== 1) {
        dx = -1;
        dy = 0;
      }
      if (i == 2 && dx !== -1) {
        dx = 1;
        dy = 0;
      }
      if (i == 3 && dy !== -1) {
        dy = 1;
        dx = 0;
      }
    });
  });
}

function eatApple() {
  const head = snake[snake.length - 1];
  if (head[0] == apple[0] && head[1] == apple[1]) {
    snake.push(addTile());
    return true;
  }
}

function spawnApple() {
  apple = [
    Math.floor(Math.random() * maxColumns()),
    Math.floor(Math.random() * maxRows()),
  ];
}

function render() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  snake.shift();
  snake.push(addTile());
  if (eatApple()) spawnApple();

  for (let [x, y] of snake) {
    setBoxToBoard(x, y);
  }
  ctx.fillStyle = "red";
  setBoxToBoard(...apple);
  ctx.fillStyle = "orange";
}

function addTile() {
  const head = snake[snake.length - 1];

  let x = head[0] + dx;
  let y = head[1] + dy;

  if (y > maxRows()) y = 0;
  if (x > maxColumns()) x = 0;
  if (x < 0) x = maxColumns();
  if (y < 0) y = maxRows();

  return [x, y];
}

function maxRows() {
  return Math.floor(innerHeight / (gap + size));
}

function maxColumns() {
  return Math.floor(innerWidth / (gap + size));
}

function toAbsolutePosition(x, y) {
  x = size * x + gap * x;
  y = size * y + gap * y;

  return [x, y];
}

function setBoxToBoard(x, y) {
  [x, y] = toAbsolutePosition(x, y);

  ctx.fillRect(x, y, size, size);
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / 2);
  render();
}

onload = () => {
  init();
  animate();
};
