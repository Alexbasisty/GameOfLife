document.addEventListener('DOMContentLoaded', () => {
  class GameOfLife {
    constructor(width, height) {
      this.boardWidth = width;
      this.boardHeight = height;
    }
  }
  const game = new GameOfLife(10,10)
  console.log(game.boardHeight, game.boardWidth);
})