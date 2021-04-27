//Variables
var board;
const player1 = 'X'
const player2 = 'O'
let player1_score = 0
let player2_score = 0
let start_button = document.getElementById('startbutton')
let message = document.getElementById('msg')
const cell = document.querySelectorAll('.cell');
const winning_patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

// Timer
var milisecond = 0
var second = 0
var minute = 0

let timer_running = false

function StartTimer() {
  if (timer_running == false) {
    timer_running = true
    TimerOn()
  }
}

function StopTimer() {
  x = timer_running == true ? timer_running = false : timer_running = false
}

function TimerOn() {
  if (timer_running == true) {
    milisecond++
    if (milisecond == 100) {
      second++
      milisecond = 0
    }
    if (second == 60) {
      minute++
      second = 0
      milisecond = 0
    }
    if (milisecond < 10 && milisecond.toString().length < 2) {
      milisecond = "0" + milisecond
    }
    if (second < 10 && second.toString().length < 2) {
      second = "0" + second
    }
    if (minute < 10 && minute.toString().length < 2) {
      minute = "0" + minute
    }
    if (minute == 60) {
      minute = 0
      second = 0
      milisecond = 0
    }
    document.getElementById('timer').innerHTML = `${minute} : ${second} : ${milisecond}`
    setTimeout('TimerOn()', 1)
  }
}

function ResetTimer() {
  timer_running = false
  document.getElementById('timer').innerHTML = `00 : 00 : 00`
  second = 0
  minute = 0
  hour = 0
}

// Main Game
start_button.onclick =
  function Start_Game() {
    message.style.display = 'block'
    message.innerText = 'You have the first turn'
    if (start_button.innerText == 'Start Playing') {
      start_button.innerText = 'Reset Game'
      start_button.style.display = 'none'
      StartTimer()
      GameStarted()

    } else if (start_button.innerText == 'Reset Game') {
      start_button.style.display = 'none'
      for (var i = 0; i < cell.length; i++) {
        document.getElementById(i).innerText = ''
        document.getElementById(i).style.color = 'rgba(0, 0, 0, 0.699)'
        document.getElementById(i).style.backgroundColor = 'transparent'
      }

      ResetTimer()
      StartTimer()
      GameStarted()
    }
  }

function GameStarted() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let cell = document.querySelectorAll('.cell');
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', CellClicked, false);
  }
}

function CellClicked(cell) {
  message.style.display = 'none'
  if (typeof(board[cell.target.id]) == 'number') {

    Play(cell.target.id, player1)
    if (!checkWin(board, player1) && !CheckTie()) {
      Play(EmptySquare(), player2)
    }
  }
}

function Play(id, player) {
  board[id] = player
  document.getElementById(id).innerHTML = player
  let gamewon = checkWin(board, player)
  if (gamewon) {
    GameOver(gamewon)
  }
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winning_patterns.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function GameOver(gameWon) {
  StopTimer()
  if (gameWon.player == player1) {
    message.style.display = 'block'
    message.innerText = 'Congratulations! You won the game 🎉🎉'
    player1_score++
    document.getElementById('player1-score').innerText = player1_score
    start_button.style.display = "block";
  }

  if (gameWon.player == player2) {
    message.style.display = 'block'
    message.innerText = 'Ooh! You lost the game 🥺🥺'
    player2_score++
    document.getElementById('player2-score').innerText = player2_score
    start_button.style.display = "block";
  }

  for (let index of winning_patterns[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == player1 ? "#4BA0F7" : "#EB4848";
    document.getElementById(index).style.color = '#F3F7FF'
  }

  for (var i = 0; i < cell.length; i++) {
    cell[i].removeEventListener('click', CellClicked, false);
  }
}

function EmptySquare() {
  emptysquare = board.filter(s => typeof s == 'number')
  const random = Math.floor(Math.random() * emptysquare.length);
  return emptysquare[random]
}

function CheckTie() {
  emptysquare = board.filter(s => typeof(s) == 'number')
  if (emptysquare.length == 0) {
    for (var i = 0; i < cell.length; i++) {
      StopTimer()
      message.style.display = 'block'
      message.innerText = `Hah! It's a Tie 😲😲`
      start_button.style.display = "block";
      document.getElementById(i).style.backgroundColor = "#98accfa2";
      document.getElementById(i).style.color = 'white'
    }
    return true
  }
  return false
}
