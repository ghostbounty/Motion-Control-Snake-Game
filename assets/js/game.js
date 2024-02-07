import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  resetSnake
} from './snake.js'
import {update as updateFood, draw as drawFood, resetFood} from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
let lives = 3; // Initialize lives
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    gameBoard.style.backgroundColor = 'black'; // Set the background to black
    gameBoard.innerHTML = '<span style="color: white; font-size: 48px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">GAME OVER</span>';
    // Optional: Restart button or any other action to reset the game.
    document.querySelector('#gameover audio').play(); // Play game over sound
    return; // Stop the game loop
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  if (outsideGrid(getSnakeHead()) || snakeIntersection()) {
    lives -= 1; // Decrease life by one
    if (lives <= 0) {
      gameOver = true; // Game over if no lives left
    } else {

      alert(`You lost a life! Lives left: ${lives}`); // Inform the player
      resetGame(); // Reset the snake
    }
  }

  function resetGame() {

    resetSnake();
    resetFood();
  }
}
