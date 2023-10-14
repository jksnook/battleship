(()=>{"use strict";var __webpack_modules__={29:()=>{eval("\n;// CONCATENATED MODULE: ./src/ship.js\nclass Ship {\n  constructor (length) {\n    this.length = length;\n    this.hits = 0;\n  }\n\n  hit () {\n    this.hits += 1;\n  }\n\n  isSunk () {\n    if (this.hits >= this.length) return true;\n    return false;\n  }\n\n}\n;// CONCATENATED MODULE: ./src/gameboard.js\n\n\nclass Square {\n  constructor () {\n    this.ship = null;\n    this.hit = false;\n  }\n}\n\nclass Gameboard {\n  constructor () {\n    this.board = [];\n    this.ships = [];\n    for (let i = 0; i < 10; i++) {\n      const col = [];\n      for (let k = 0; k < 10; k++) {\n        col.push(new Square());\n      }\n      this.board.push(col);\n    }\n  }\n\n  place (cords, length, orientation) {\n    if (orientation === 'up') {\n      orientation = [0, 1];\n    } else if (orientation === 'right') {\n      orientation = [1, 0];\n    } else if (orientation === 'down') {\n      orientation = [0, -1];\n    } else if (orientation ==='left') {\n      orientation = [-1, 0];\n    }\n    for (let i = 0; i < length; i++) {\n      let newCords = [cords[0] + orientation[0] * i, cords[1] + orientation[1] * i];\n      if (newCords[0] < 0 || newCords[0] > 9) return undefined;\n      if (newCords[1] < 0 || newCords[1] > 9) return undefined;\n      if (this.hasShip(newCords)) return undefined;\n    }\n\n    let ship = new Ship(length);\n    for (let i = 0; i < length; i++) {\n      this.board[cords[0] + orientation[0] * i][cords[1] + orientation[1] * i].ship = ship;\n    }\n    this.ships.push(ship);\n  }\n\n  hasShip (cords) {\n    if (this.board[cords[0]][cords[1]].ship) return true;\n    return false;\n  }\n\n  getSquare(cords) {\n    return this.board[cords[0]][cords[1]]\n  }\n\n  getShip (cords) {\n    return this.board[cords[0]][cords[1]].ship;\n  }\n\n  receiveAttack (cords) {\n    if (this.hasShip(cords) && this.getSquare(cords).hit === false) {\n      this.getShip(cords).hit();\n    }\n    this.getSquare(cords).hit = true\n  }\n\n  allSunk () {\n    for (const ship of this.ships) {\n      if (!ship.isSunk()) return false;\n    }\n    return true;\n  }\n}\n;// CONCATENATED MODULE: ./src/player.js\n\n\nclass Player {\n  constructor () {\n    this.board = new Gameboard();\n  }\n\n  setOpponent (opponent) {\n    this.opponent = opponent;\n  }\n\n  play (cords) {\n    this.opponent.board.receiveAttack(cords);\n  }\n\n  autoplay () {\n    let randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n    while (this.opponent.board.getSquare(randCords).hit) {\n      randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n    }\n    this.opponent.board.receiveAttack(randCords);\n  }\n}\n;// CONCATENATED MODULE: ./src/drawBoard.js\nfunction drawBoard(player) {\n  if (player.opponent.board.allSunk()) {\n    alert('You Win!')\n    return undefined;\n  } else if (player.board.allSunk()) {\n    alert('You Lose!')\n    return undefined;\n  }\n  const enemyBoard = document.getElementById('enemy-board');\n  enemyBoard.innerHTML = '';\n  for (let i = 9; i >= 0; i--) {\n    for (let k = 0; k < 10; k++) {\n      const cords = [k, i];\n      const squareDiv = document.createElement('div');\n      squareDiv.classList.add('square');\n      if (player.opponent.board.hasShip(cords) && player.opponent.board.getSquare(cords).hit) {\n        squareDiv.classList.add('ship');\n      } else if (player.opponent.board.getSquare(cords).hit) {\n        squareDiv.classList.add('miss');\n      }\n      squareDiv.addEventListener('click', () => {\n        player.play(cords);\n        player.opponent.autoplay();\n        drawBoard(player);\n      });\n      enemyBoard.appendChild(squareDiv);\n    }\n  }\n  const playerBoard = document.getElementById('my-board');\n  playerBoard.innerHTML = '';\n  for (let i = 9; i >= 0; i--) {\n    for (let k = 0; k < 10; k++) {\n      const cords = [k, i];\n      const squareDiv = document.createElement('div');\n      squareDiv.classList.add('square');\n      if (player.board.hasShip(cords)) {\n        squareDiv.classList.add('ship');\n      } else if (player.board.getSquare(cords).hit) {\n        squareDiv.classList.add('miss');\n      }\n      playerBoard.appendChild(squareDiv);\n    }\n  }\n}\n;// CONCATENATED MODULE: ./src/index.js\n\n\n\n//create players\nlet player1 = new Player();\nlet player2 = new Player();\nplayer1.setOpponent(player2);\nplayer2.setOpponent(player1);\n//place ships\nplayer1.board.place([3, 5], 4, 'right');\nplayer2.board.place([3, 5], 4, 'right');\n\n//draw boards with appropriate event listeners on squares\ndrawBoard(player1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjkuanMiLCJtYXBwaW5ncyI6Ijs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOztBQ2YwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsSUFBSTtBQUN2QixvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOztBQ3hFbUM7O0FBRXBCO0FBQ2Y7QUFDQSxxQkFBcUIsU0FBUztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7QUN0QmU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQixvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOztBQzNDOEI7QUFDTTs7QUFFcEM7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QixrQkFBa0IsTUFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcz9kMDM3Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzP2ZjM2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanM/YThhMiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RyYXdCb2FyZC5qcz82ODVlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQgKCkge1xuICAgIHRoaXMuaGl0cyArPSAxO1xuICB9XG5cbiAgaXNTdW5rICgpIHtcbiAgICBpZiAodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxufSIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgU3F1YXJlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc2hpcCA9IG51bGw7XG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbCA9IFtdO1xuICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgaysrKSB7XG4gICAgICAgIGNvbC5wdXNoKG5ldyBTcXVhcmUoKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmJvYXJkLnB1c2goY29sKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZSAoY29yZHMsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICd1cCcpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gWzAsIDFdO1xuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gWzEsIDBdO1xuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICdkb3duJykge1xuICAgICAgb3JpZW50YXRpb24gPSBbMCwgLTFdO1xuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09J2xlZnQnKSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFstMSwgMF07XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuZXdDb3JkcyA9IFtjb3Jkc1swXSArIG9yaWVudGF0aW9uWzBdICogaSwgY29yZHNbMV0gKyBvcmllbnRhdGlvblsxXSAqIGldO1xuICAgICAgaWYgKG5ld0NvcmRzWzBdIDwgMCB8fCBuZXdDb3Jkc1swXSA+IDkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBpZiAobmV3Q29yZHNbMV0gPCAwIHx8IG5ld0NvcmRzWzFdID4gOSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIGlmICh0aGlzLmhhc1NoaXAobmV3Q29yZHMpKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGxldCBzaGlwID0gbmV3IFNoaXAobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkW2NvcmRzWzBdICsgb3JpZW50YXRpb25bMF0gKiBpXVtjb3Jkc1sxXSArIG9yaWVudGF0aW9uWzFdICogaV0uc2hpcCA9IHNoaXA7XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuXG4gIGhhc1NoaXAgKGNvcmRzKSB7XG4gICAgaWYgKHRoaXMuYm9hcmRbY29yZHNbMF1dW2NvcmRzWzFdXS5zaGlwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRTcXVhcmUoY29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZFtjb3Jkc1swXV1bY29yZHNbMV1dXG4gIH1cblxuICBnZXRTaGlwIChjb3Jkcykge1xuICAgIHJldHVybiB0aGlzLmJvYXJkW2NvcmRzWzBdXVtjb3Jkc1sxXV0uc2hpcDtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2sgKGNvcmRzKSB7XG4gICAgaWYgKHRoaXMuaGFzU2hpcChjb3JkcykgJiYgdGhpcy5nZXRTcXVhcmUoY29yZHMpLmhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZ2V0U2hpcChjb3JkcykuaGl0KCk7XG4gICAgfVxuICAgIHRoaXMuZ2V0U3F1YXJlKGNvcmRzKS5oaXQgPSB0cnVlXG4gIH1cblxuICBhbGxTdW5rICgpIHtcbiAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy5zaGlwcykge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIHNldE9wcG9uZW50IChvcHBvbmVudCkge1xuICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudDtcbiAgfVxuXG4gIHBsYXkgKGNvcmRzKSB7XG4gICAgdGhpcy5vcHBvbmVudC5ib2FyZC5yZWNlaXZlQXR0YWNrKGNvcmRzKTtcbiAgfVxuXG4gIGF1dG9wbGF5ICgpIHtcbiAgICBsZXQgcmFuZENvcmRzID0gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcbiAgICB3aGlsZSAodGhpcy5vcHBvbmVudC5ib2FyZC5nZXRTcXVhcmUocmFuZENvcmRzKS5oaXQpIHtcbiAgICAgIHJhbmRDb3JkcyA9IFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gICAgfVxuICAgIHRoaXMub3Bwb25lbnQuYm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kQ29yZHMpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHJhd0JvYXJkKHBsYXllcikge1xuICBpZiAocGxheWVyLm9wcG9uZW50LmJvYXJkLmFsbFN1bmsoKSkge1xuICAgIGFsZXJ0KCdZb3UgV2luIScpXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBMb3NlIScpXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBlbmVteUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZW15LWJvYXJkJyk7XG4gIGVuZW15Qm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIGZvciAobGV0IGkgPSA5OyBpID49IDA7IGktLSkge1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTA7IGsrKykge1xuICAgICAgY29uc3QgY29yZHMgPSBbaywgaV07XG4gICAgICBjb25zdCBzcXVhcmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHNxdWFyZURpdi5jbGFzc0xpc3QuYWRkKCdzcXVhcmUnKTtcbiAgICAgIGlmIChwbGF5ZXIub3Bwb25lbnQuYm9hcmQuaGFzU2hpcChjb3JkcykgJiYgcGxheWVyLm9wcG9uZW50LmJvYXJkLmdldFNxdWFyZShjb3JkcykuaGl0KSB7XG4gICAgICAgIHNxdWFyZURpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllci5vcHBvbmVudC5ib2FyZC5nZXRTcXVhcmUoY29yZHMpLmhpdCkge1xuICAgICAgICBzcXVhcmVEaXYuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgICAgfVxuICAgICAgc3F1YXJlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwbGF5ZXIucGxheShjb3Jkcyk7XG4gICAgICAgIHBsYXllci5vcHBvbmVudC5hdXRvcGxheSgpO1xuICAgICAgICBkcmF3Qm9hcmQocGxheWVyKTtcbiAgICAgIH0pO1xuICAgICAgZW5lbXlCb2FyZC5hcHBlbmRDaGlsZChzcXVhcmVEaXYpO1xuICAgIH1cbiAgfVxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1ib2FyZCcpO1xuICBwbGF5ZXJCb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDk7IGkgPj0gMDsgaS0tKSB7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgaysrKSB7XG4gICAgICBjb25zdCBjb3JkcyA9IFtrLCBpXTtcbiAgICAgIGNvbnN0IHNxdWFyZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ3NxdWFyZScpO1xuICAgICAgaWYgKHBsYXllci5ib2FyZC5oYXNTaGlwKGNvcmRzKSkge1xuICAgICAgICBzcXVhcmVEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuZ2V0U3F1YXJlKGNvcmRzKS5oaXQpIHtcbiAgICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH1cbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZURpdik7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBkcmF3Qm9hcmQgZnJvbSBcIi4vZHJhd0JvYXJkXCI7XG5cbi8vY3JlYXRlIHBsYXllcnNcbmxldCBwbGF5ZXIxID0gbmV3IFBsYXllcigpO1xubGV0IHBsYXllcjIgPSBuZXcgUGxheWVyKCk7XG5wbGF5ZXIxLnNldE9wcG9uZW50KHBsYXllcjIpO1xucGxheWVyMi5zZXRPcHBvbmVudChwbGF5ZXIxKTtcbi8vcGxhY2Ugc2hpcHNcbnBsYXllcjEuYm9hcmQucGxhY2UoWzMsIDVdLCA0LCAncmlnaHQnKTtcbnBsYXllcjIuYm9hcmQucGxhY2UoWzMsIDVdLCA0LCAncmlnaHQnKTtcblxuLy9kcmF3IGJvYXJkcyB3aXRoIGFwcHJvcHJpYXRlIGV2ZW50IGxpc3RlbmVycyBvbiBzcXVhcmVzXG5kcmF3Qm9hcmQocGxheWVyMSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///29\n")}},__webpack_exports__={};__webpack_modules__[29]()})();