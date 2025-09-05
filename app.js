let gameSeq = [];
let userSeq = [];

let btns = ["red","yellow","purple","green"];

let started = false;
let level=0;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function (){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    if(highScore < level){
        highScore = level;
    }
    h2.innerText = `Level ${level}`;
    
    let randIdx = Math.floor(Math.random() * 4) ;
    let randomColor =btns[randIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    // console.log(randIdx);
    // console.log(randomColor);
    // console.log(randBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx){
    // console.log("curr lvl : ",level);
    
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}<b></br>High score is <b>${highScore}<b></br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },200)
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn =this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}