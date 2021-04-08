let board;
const player1 = 'X'
const player2 = 'O'
let player1_score = 0
let player2_score = 0

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

let start_button = document.getElementById('startbutton')


start_button.onclick = 
function Start_Game(){
    if (start_button.innerText == 'Start Playing' || start_button.innerText == 'Play Again'){
        start_button.innerText = 'Quit Game'
        start_button.style.backgroundColor = '#EB4848'
        GameStarted()
        
    }else{
        start_button.innerText = 'Play Again'
        start_button.style.backgroundColor = '#4BA0F7'
        //GameStoped()
    }
}


function GameStarted() {
    board = [0,1,2,3,4,5,6,7,8];
    const cell = document.querySelectorAll('.cell');
    for (i = 0; i < cell.length; i++) {
        cell[i].addEventListener('click', CellClicked, false)
    }
}

function CellClicked(cell){
    if (typeof(board[cell.target.id]) == 'number'){
        Play(cell.target.id, player1)
        if(!CheckTie()){
            Play(BestSpot(), player2)
        }
    } 
}

function Play(id, player) {
    board[id] = player
    document.getElementById(id).innerHTML = player
    let gamewon = checkWin(board, player)
    if (gamewon){
        GameOver(gamewon)
    }
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winning_patterns.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function GameOver(gameWon) {
    if (gameWon.player == player1){
        player1_score++
        document.getElementById('player1-score').innerText = player1_score
    }

    if (gameWon.player == player2){
        player2_score++
        document.getElementById('player2-score').innerText = player2_score
    }

	for (let index of winning_patterns[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == player1 ? "#4BA0F7" : "#EB4848";
        document.getElementById(index).style.color = '#F3F7FF'
	}
    const cell = document.querySelectorAll('.cell');
	for (var i = 0; i < cell.length; i++) {
		cell[i].removeEventListener('click', CellClicked, false);
	}
}

function EmptySquare() {
    emptysquare = board.filter(s => typeof(s) == 'number')
    return emptysquare[0]
}

function BestSpot() {
    return minimax(board, player2).index;
}

function CheckTie() {
    emptysquare = board.filter(s => typeof(s) == 'number')
    if (emptysquare.length == 0){
        console.log("vmfkv");
        return true
    }
    return false
}
