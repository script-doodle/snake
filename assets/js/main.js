import {
  update as UpdateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./Snake.js";

import { update as updateFood, draw as drawFood } from "./Food.js";
import { outsideGrid } from "./Grid.js";

const gameBoard = document.getElementById("game-board");
let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("Game over. Press ok to restart")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  UpdateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
