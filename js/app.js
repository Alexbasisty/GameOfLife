document.addEventListener('DOMContentLoaded', () => {
  class GameOfLife {
    constructor(width, height) {
      this.boardWidth = width;
      this.boardHeight = height;
      this.board = document.getElementById('board');
      this.cells = []
    }
    createBoard = () => {
      this.board.style.width = `${this.boardWidth * 10}px`;
      this.board.style.height = `${this.boardHeight * 10}px`;
      const fieldsSum = this.boardHeight * this.boardWidth;
      for(let i = 0; i < fieldsSum; i++) {
        const newDiv = document.createElement('div');
        this.board.appendChild(newDiv);
        this.cells.push(newDiv);
      }

      this.cells.forEach(cell => {
        cell.addEventListener('click', event => {
          event.target.classList.toggle('live')
        })
      })
    }
  }
  const game = new GameOfLife(10,10);
  game.createBoard();
})