const b11 = document.getElementById("b11");
const b12 = document.getElementById("b12");
const b13 = document.getElementById("b13");
const b21 = document.getElementById("b21");
const b22 = document.getElementById("b22");
const b23 = document.getElementById("b23");
const b31 = document.getElementById("b31");
const b32 = document.getElementById("b32");
const b33 = document.getElementById("b33");

const lines = document.getElementsByClassName("line");

const darkBox = document.getElementById("blackBox");
const message = document.getElementById("message");
const finalField = document.getElementById("finalField");
const field = document.getElementById("field");
const gameList = document.getElementById("gameList");
const games =  gameList.getElementsByTagName("li");
const settings = document.getElementById("settings");


const matrix = [
    [b11, b12, b13],
    [b21, b22, b23],
    [b31, b32, b33]
];

let stepsCount = 0;
let isPlay = true;
let isX = true;
const x = '<div class="x-box"><span class="x-line"></span><span class="x-line"></span></div>';
const o = '<div class="o-box"><div class="o-o-box"></div></div>';



for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) matrix[i][j].addEventListener('click', step);


function step(event) {
    if (isEmtyF(event.target) || !isPlay) return;
    stepsCount++;
    if (isX) {
        stepsCount % 2 == 0 ? putSymbol(event.target, o) : putSymbol(event.target, x);
    } else {
        stepsCount % 2 == 0 ? putSymbol(event.target, x) : putSymbol(event.target, o);
    }
    let result = checkF();
    if (result) {
       isPlay = false;
       setTimeout(showDark, 1500);
       message.style.display = "flex";
       let winner = result == x ? "Крестики" : "Нолики";
       message.getElementsByTagName('h2')[0].innerHTML = `Победили ${winner}`;
       message.getElementsByTagName('p')[0].innerHTML = `Вы совершили ${stepsCount} ходов`;
       finalField.getElementsByClassName("game-box")[0].innerHTML = field.innerHTML;

       pushR(`Победили ${winner}`);
    } else if (stepsCount == 9) {
       isPlay = false;
       setTimeout(showDark, 1000);
       message.style.display = "flex";
       message.getElementsByTagName('h2')[0].innerHTML = `Ничья!`;
       message.getElementsByTagName('p')[0].innerHTML = `Вы совершили 9 ходов`;
       finalField.getElementsByClassName("game-box")[0].innerHTML = field.innerHTML;

       pushR(`Ничья!`);
    }
}

function putSymbol(target, type) {
    target.innerHTML = type;
}

function isEmtyF(target) {
    let isField = false;
    let isEmty = false
    if (target.innerHTML == o || target.innerHTML == x) isEmty = true;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (target.id == matrix[i][j].id) isField = true;
    if (isEmty || !isField) return true;
}

function clearF() {
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) matrix[i][j].innerHTML = "";
    for (let i = 0; i < lines.length; i++) lines[i].style.width = "0vw";
    stepsCount = 0;
    isPlay = true;
}

function checkF() {
    let type = false;
    if (b11.innerHTML == b12.innerHTML && b11.innerHTML == b13.innerHTML && b11.innerHTML != ""){
       lines[0].style.width = "35vw";
       type = b11.innerHTML;
    }
    if (b21.innerHTML == b22.innerHTML && b21.innerHTML == b23.innerHTML && b21.innerHTML != ""){
        lines[1].style.width = "35vw";
        type = b22.innerHTML;
    }
    if (b31.innerHTML == b32.innerHTML && b31.innerHTML == b33.innerHTML && b31.innerHTML != "") {
        lines[2].style.width = "35vw";
        type = b33.innerHTML;
    }

    if (b11.innerHTML == b21.innerHTML && b11.innerHTML == b31.innerHTML && b11.innerHTML != ""){
        lines[3].style.width = "36vw";
        type = b11.innerHTML;
     }
     if (b12.innerHTML == b22.innerHTML && b12.innerHTML == b32.innerHTML && b12.innerHTML != ""){
         lines[4].style.width = "36vw";
         type = b22.innerHTML;
     }
     if (b13.innerHTML == b23.innerHTML && b13.innerHTML == b33.innerHTML && b13.innerHTML != "") {
         lines[5].style.width = "36vw";
         type = b33.innerHTML;
     }

     if (b11.innerHTML == b22.innerHTML && b11.innerHTML == b33.innerHTML && b11.innerHTML != ""){
        lines[6].style.width = "51vw";
        type = b11.innerHTML;
     }
     if (b13.innerHTML == b22.innerHTML && b13.innerHTML == b31.innerHTML && b22.innerHTML != ""){
         lines[7].style.width = "51vw";
         type = b22.innerHTML;
     }
    return type;
}

function showDark() {
    darkBox.style.display = "flex";
}

window.addEventListener('click', (event)=> {
    if (event.target.id == "blackBox") {
        darkBox.style.display = "none";
        message.style.display = "none";
        gameList.style.display = "none";
        settings.style.display = "none";
        finalField.getElementsByClassName("game-box")[0].innerHTML = "";
    }
})

function showR() {
    showDark()
    gameList.style.display = "flex";

    for(let i = 0; i < localStorage.length; i++) {
        games[i].innerHTML = localStorage.getItem("s" + i);
    }
}

function pushR(winner) {
    let rKey = "s" + localStorage.index;
    localStorage.setItem(`s${localStorage.index % 10}`, winner);

    localStorage.index = +localStorage.index + 1;
}
// localStorage.clear();

if (!localStorage.index) localStorage.setItem("index", 0);

function showS() {
    showDark();
    settings.style.display = "block";
}

function changeFirst(is) {
    isX = is;
} 

function changeColor(color) {
    document.getElementsByTagName('body')[0].style.background = color;
}