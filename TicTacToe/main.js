var board;
var player1 = 'X'
var player2 = 'O'

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
        GameStoped()
    }
}

function GameStoped(){
    const cell = document.querySelectorAll('.cell');
    for (i = 0; i < cell.length; i++) {
        Play(i, '')
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
    Play(cell.target.id, player1)
}

function Play(id, player) {
    board[id] = player
    document.getElementById(id).innerHTML = player
}