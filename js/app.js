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
      this.board.addEventListener('click', () => {
        this.cells.forEach(cell => {
          cell.addEventListener('mousemove', event => {
            event.target.classList.toggle('live')
          })
        })
      })

    }

    getCoordinates = (x, y) => {
      const index = (x - 1) + (y - 1) * this.boardWidth;
      return this.cells[index];
    }

    setCellState = (x, y, state) => {
      this.getCoordinates(x, y).classList.add(state)
    }

    firstGlider = () => {
      this.setCellState(1,2, 'live')
      this.setCellState(2,2, 'live')
      this.setCellState(1,3, 'live')
      this.setCellState(2,3, 'live')
      this.setCellState(2,1, 'live')
    }

    computeCellNextState = (x, y) => {
      const div = this.getCoordinates(x, y)
      const neighbour1 = this.getCoordinates(x - 1, y - 1);
      const neighbour2 = this.getCoordinates(x, y - 1);
      const neighbour3 = this.getCoordinates(x + 1, y - 1);
      const neighbour4 = this.getCoordinates(x - 1, y);
      const neighbour5 = this.getCoordinates(x + 1, y);
      const neighbour6 = this.getCoordinates(x -1, y + 1);
      const neighbour7 = this.getCoordinates(x, y + 1);
      const neighbour8 = this.getCoordinates(x + 1, y + 1);
      let liveCells = 0;
      if (neighbour1 !== undefined && neighbour1.className === 'live') {liveCells ++}
      if (neighbour2 !== undefined && neighbour2.className === 'live') {liveCells ++}
      if (neighbour3 !== undefined && neighbour3.className === 'live') {liveCells ++}
      if (neighbour4 !== undefined && neighbour4.className === 'live') {liveCells ++}
      if (neighbour5 !== undefined && neighbour5.className === 'live') {liveCells ++}
      if (neighbour6 !== undefined && neighbour6.className === 'live') {liveCells ++}
      if (neighbour7 !== undefined && neighbour7.className === 'live') {liveCells ++}
      if (neighbour8 !== undefined && neighbour8.className === 'live') {liveCells ++}
      if (div.className === 'live' && liveCells === 2 || liveCells === 3) {
        return 1
      } else if (div.className === 'live' && liveCells < 2 || liveCells > 3){
        return 0
      } else if (div.className !== 'live' && liveCells === 3) {
        return 1
      }
    }

    computeNextGeneration = () => {
      let futureStates = [];
      for(let i = 1; i <= this.boardWidth; i++) {
        for(let j = 1; j <= this.boardHeight; j++) {
          futureStates.push(this.computeCellNextState(j, i))
        }
      }
      return futureStates;
    }

    printNextGeneration = () => {
      let states = this.computeNextGeneration()
      for(let i = 0; i < this.cells.length; i++) {
        if(states[i] === 1) {
          this.cells[i].classList.add('live')
        } else {
          this.cells[i].classList.remove('live')
        }
      }
    }

    startGame = () => {
      this.idInterval = setInterval(() => {
        this.printNextGeneration()
      }, 350)
    }

    pauseGame = () => {
      clearInterval(this.idInterval)
    }
  }

  const fieldWidth = prompt('Wpisz szerokość pola');
  const fieldHeight = prompt('Wpisz wysokość pola');

  const game = new GameOfLife(fieldWidth ,fieldHeight);
  const playButton = document.getElementById('play');
  const pauseButton = document.getElementById('pause');
  playButton.addEventListener('click', game.startGame);
  pauseButton.addEventListener('click', game.pauseGame)
  game.createBoard();
  game.firstGlider();
})