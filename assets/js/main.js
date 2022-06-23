import {
  update as updateSnake,
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

/*========== GAME LOOP ==========*/
function main(currentTime) {
  // Game over alert
  if (gameOver) {
    if (confirm("Game over. Press ok to restart")) {
      window.location = "/";
    }
    return;
  }

  window.requestAnimationFrame(main);

  // Calculating render time
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  // Calling update & draw function in Game loop to keep updating & drawing game elements continuously
  update();
  draw();
}
// Continuously requesting animation frame from main function to keep the game running
window.requestAnimationFrame(main);

/*========== UPDATING GAME ==========*/
function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

/*========== DRAWING GAME ==========*/
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

/*========== HANDLING GAME OVER ==========*/
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
