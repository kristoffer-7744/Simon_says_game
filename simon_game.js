let gameSeq = [];
let userSeq = [];
let level=0;
let highScor = 5;
let started=false;
let btns = ["yellow", "red", "purple", "green"];
let h2= document.querySelector("h2");
let high = document.querySelector(".highscore");
const startBtn = document.getElementById("start");
const click = new Audio('Sounds/click.mp3');
const backgroundM = new Audio('Sounds/background2.mp3');
const lvlUp = new Audio('Sounds/levelUp.mp3');
const gameOver = new Audio('Sounds/gameOver.mp3');
const beginBtn = new Audio('Sounds/startBtn.mp3');

//Starting point of the game
startBtn.addEventListener("click", function(){
  beginBtn.play();
  beginBtn.volume = 0.3;
  if(started==false){
    levelUp();
    started=true;
    //adding CLICK event on each button.
    let allBtns = document.querySelectorAll(".btn");
    for(let btn of allBtns){
      btn.addEventListener("click", btnpPress);
    }
  }
});

//level ups when player successfully matches the game sequence
function levelUp(){
    userSeq = [];    
    level++;
    h2.innerText= `Level ${level}`;
    h2.style.color = "";
    h2.style.transform = "scale(1.5)";
    h2.style.transition = "0.4s";
    setTimeout(() => {
      h2.style.transform = "scale(1)";
    },400);
    if(level>1){
      lvlUp.play();
    }

    let randIdx = Math.floor(Math.random() * 4);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//hint flash (player needs to follow this sequence)
function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function (){
      btn.classList.remove("flash");
  }, 200);
}

//flases the pressed button for 0.1sec
function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(function (){
      btn.classList.remove("userflash");
  }, 100);

}

//cheking the Sequence  
function checkAns(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp, 750);
    }
  }else{
    gameOver.play();
    gameOver.volume = 0.5;
    gameOver.playbackRate = 1.8;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
      document.querySelector("body").style.backgroundColor = "#282c34";
    }, 150);

    h2.innerHTML = `Game over! Your score is : <b>${level}</b>`;
    h2.style.transform = "scaleX(0)"
    h2.style.transition = "0.3s";
    setTimeout(() => {
      h2.style.transform = "scaleX(1)"
    },300);
    startBtn.innerText="! Play Again !"; 
    highScore();
    reset();
  }
}

//called whenever any button is pressed
function btnpPress(){
  //Sound's whenever btn being pressed
  click.play();
  click.playbackRate = 3;
  click.volume = 1;
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

//showing highschore to the player
function highScore(){
  if(highScor < level){
    highScor=level;
    h2.innerText = `HIGHSCORE`;
    h2.style.transform = "scale(3)";
    h2.style.transition = "0.5s";
    setTimeout(() => {
      h2.style.transform = "scale(2)";
    },500);

    high.innerHTML=`Highscore : <h1 id="high">${highScor}</h1>`;
  }
}

//game reset
function reset (){
  level = 0;
  gameSeq=[];
  userSeq=[];
  started = false;
  let allBtns = document.querySelectorAll(".btn");
  for(let btn of allBtns){
    btn.removeEventListener("click", btnpPress);
  }
  startBtn.innerText="Play Again";
}
