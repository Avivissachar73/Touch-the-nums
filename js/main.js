'use strict';

var gBoardSize = 5;
var gNextNum = 1;

var gTime = 0;
var timerInterval;
var gTimerStr = '';

console.log('hello git!!!');

function resetGame(boardSize) {
    gBoardSize = boardSize;
    init();
}

function init() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    gNextNum = 1;
    gTime = 0;
    createBoard();
    document.querySelector('.timer').innerText = '0.00';
}


function timer() {
    gTimerStr = '';
    if (gTime < 10) gTimerStr = '0.0'+gTime;
    else gTimerStr += gTime/100;
    gTime += 1;
    document.querySelector('.timer').innerText = gTimerStr;
}

function cellClicked(elCell) {
    if (+elCell.innerText === gNextNum) {
        elCell.innerText = '';
        elCell.classList.add('clicked');
        console.log('thats right!');
        if (gNextNum === 1) timerInterval = setInterval(timer,10);
        else if (gNextNum === gBoardSize*gBoardSize) {
            var msg = `You finished the game!\nYou did it in only ${gTimerStr} seconds!`;
            console.log(msg);
            alert(msg);
            clearInterval(timerInterval);
        }
        gNextNum++;
    } else console.log('Wrong number!');
}

function createBoard() {
    var randNums = getRanNums((gBoardSize*gBoardSize));
    var htmlStr = '<table>';
    for (var i = 0; i < gBoardSize; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gBoardSize; j++) {
            htmlStr += `<td onclick="cellClicked(this)" class="cell">${randNums.pop()}</td>`;
        }
        htmlStr += '</tr>';
    }
    htmlStr += '</table>';
    document.querySelector('.game-board').innerHTML = htmlStr;
}

function getRanNums(amountOfNums) {
    var nums = range(amountOfNums, 1);
    var shuffledNums = [];
    while(nums.length) {
        var idx = getRandomInt(0, nums.length-1);
        var num = nums.splice(idx,1)[0];
        shuffledNums.push(num);
    }
    return shuffledNums;
}

function range(range , start = 0) {
    var nums = [];
    for (var i = start; i <= range; i++) {
        nums.push(i);
    }
    return nums;
}

function getRandomInt(num1, num2) {
    var maxNum = (num1 > num2)? num1+1 : num2+1;
    var minNum = (num2 > num1)? num1 : num2;
    return (Math.floor(Math.random()*(maxNum - minNum)) + minNum);
}