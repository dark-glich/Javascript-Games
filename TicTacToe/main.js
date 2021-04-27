'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//Variables
var board;
var player1 = 'X';
var player2 = 'O';
var player1_score = 0;
var player2_score = 0;
var start_button = document.getElementById('startbutton');
var message = document.getElementById('msg');
var cell = document.querySelectorAll('.cell');
var winning_patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

// Timer
var milisecond = 0;
var second = 0;
var minute = 0;

var timer_running = false;

function StartTimer() {
  if (timer_running == false) {
    timer_running = true;
    TimerOn();
  }
}

function StopTimer() {
  x = timer_running == true ? timer_running = false : timer_running = false;
}

function TimerOn() {
  if (timer_running == true) {
    milisecond++;
    if (milisecond == 100) {
      second++;
      milisecond = 0;
    }
    if (second == 60) {
      minute++;
      second = 0;
      milisecond = 0;
    }
    if (milisecond < 10 && milisecond.toString().length < 2) {
      milisecond = "0" + milisecond;
    }
    if (second < 10 && second.toString().length < 2) {
      second = "0" + second;
    }
    if (minute < 10 && minute.toString().length < 2) {
      minute = "0" + minute;
    }
    if (minute == 60) {
      minute = 0;
      second = 0;
      milisecond = 0;
    }
    document.getElementById('timer').innerHTML = minute + ' : ' + second + ' : ' + milisecond;
    setTimeout('TimerOn()', 1);
  }
}

function ResetTimer() {
  timer_running = false;
  document.getElementById('timer').innerHTML = '00 : 00 : 00';
  second = 0;
  minute = 0;
  hour = 0;
}

// Main Game
start_button.onclick = function Start_Game() {
  message.style.display = 'block';
  message.innerText = 'You have the first turn';
  if (start_button.innerText == 'Start Playing') {
    start_button.innerText = 'Reset Game';
    start_button.style.display = 'none';
    StartTimer();
    GameStarted();
  } else if (start_button.innerText == 'Reset Game') {
    start_button.style.display = 'none';
    for (var i = 0; i < cell.length; i++) {
      document.getElementById(i).innerText = '';
      document.getElementById(i).style.color = 'rgba(0, 0, 0, 0.699)';
      document.getElementById(i).style.backgroundColor = 'transparent';
    }

    ResetTimer();
    StartTimer();
    GameStarted();
  }
};

function GameStarted() {
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var cell = document.querySelectorAll('.cell');
  for (i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', CellClicked, false);
  }
}

function CellClicked(cell) {
  message.style.display = 'none';
  if (typeof board[cell.target.id] == 'number') {

    Play(cell.target.id, player1);
    if (!checkWin(board, player1) && !CheckTie()) {
      Play(EmptySquare(), player2);
    }
  }
}

function Play(id, player) {
  board[id] = player;
  document.getElementById(id).innerHTML = player;
  var gamewon = checkWin(board, player);
  if (gamewon) {
    GameOver(gamewon);
  }
}

function checkWin(board, player) {
  var plays = board.reduce(function (a, e, i) {
    return e === player ? a.concat(i) : a;
  }, []);
  var gameWon = null;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = winning_patterns.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var index = _ref2[0];
      var win = _ref2[1];

      if (win.every(function (elem) {
        return plays.indexOf(elem) > -1;
      })) {
        gameWon = {
          index: index,
          player: player
        };
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return gameWon;
}

function GameOver(gameWon) {
  StopTimer();
  if (gameWon.player == player1) {
    message.style.display = 'block';
    message.innerText = 'Congratulations! You won the game 🎉🎉';
    player1_score++;
    document.getElementById('player1-score').innerText = player1_score;
    start_button.style.display = "block";
  }

  if (gameWon.player == player2) {
    message.style.display = 'block';
    message.innerText = 'Ooh! You lost the game 🥺🥺';
    player2_score++;
    document.getElementById('player2-score').innerText = player2_score;
    start_button.style.display = "block";
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = winning_patterns[gameWon.index][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var index = _step2.value;

      document.getElementById(index).style.backgroundColor = gameWon.player == player1 ? "#4BA0F7" : "#EB4848";
      document.getElementById(index).style.color = '#F3F7FF';
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  for (var i = 0; i < cell.length; i++) {
    cell[i].removeEventListener('click', CellClicked, false);
  }
}

function EmptySquare() {
  emptysquare = board.filter(function (s) {
    return typeof s == 'number';
  });
  var random = Math.floor(Math.random() * emptysquare.length);
  return emptysquare[random];
}

function CheckTie() {
  emptysquare = board.filter(function (s) {
    return typeof s == 'number';
  });
  if (emptysquare.length == 0) {
    for (var i = 0; i < cell.length; i++) {
      StopTimer();
      message.style.display = 'block';
      message.innerText = 'Hah! It\'s a Tie \uD83D\uDE32\uD83D\uDE32';
      start_button.style.display = "block";
      document.getElementById(i).style.backgroundColor = "#98accfa2";
      document.getElementById(i).style.color = 'white';
    }
    return true;
  }
  return false;
}
