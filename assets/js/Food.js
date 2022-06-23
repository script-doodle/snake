import { onSnake, expandSnake } from "./Snake.js";
import { randomGridPosition } from "./Grid.js";

const EXPANSION_RATE = 1;
let food = getRandomFoodPosition();

/*========== UPDATING FOOD ==========*/
export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

/*========== DRAWING FOOD ==========*/
export function draw(gameBoard) {
  const foodElem = document.createElement("div");
  foodElem.style.gridRowStart = food.y;
  foodElem.style.gridColumnStart = food.x;
  foodElem.classList.add("food");
  gameBoard.append(foodElem);
}

/*========== GETTING RANDOM FOOD POSITION ==========*/
function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
