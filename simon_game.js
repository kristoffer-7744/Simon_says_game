let gameSeq = [];
let userSeq = [];
let level=0;
let highScor = 5;
let started=false;
let btns = ["yellow", "red", "purple", "green"];
let h2= document.querySelector("h2");
let high = document.querySelector(".highscore");
const startBtn = document.getElementById("start");
const mainDiv = document.getElementById("mainContainer");
const help = document.getElementById("help");

//sound effects for game
const backgroundM = new Audio('Sounds/background.mp3');
const beginBtn = new Audio('Sounds/startBtn.mp3');
const click = new Audio('Sounds/click.mp3');
const lvlUp = new Audio('Sounds/levelUp.mp3');
const highscoreSound = new Audio('Sounds/highscore.mp3');
const gameOver = new Audio('Sounds/gameOver.mp3');

//Starting point of the game
startBtn.addEventListener("click", function(){
  backgroundM.play();
  backgroundM.loop = true;
  backgroundM.volume = 0.1;
  beginBtn.play();
  beginBtn.volume = 0.2;
  if(started==false){
    levelUp();
    started=true;
    let allBtns = document.querySelectorAll(".btn");
    for(let btn of allBtns){
      btn.addEventListener("click", btnpPress); //adding CLICK event on each button.

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
      lvlUp.volume = 0.3;
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
    if(highScor >= level) {
      gameOver.play();
      gameOver.volume = 0.3;
      gameOver.playbackRate = 1.8;
    }
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
      document.querySelector("body").style.backgroundColor = "#282c34";
    }, 150);

    h2.innerHTML = `Game over! Your score is : <b>${level}</b>`;
    h2.style.transform = "scaleX(1.3)";
    h2.style.transition = "0.2s";
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
  click.playbackRate = 5;
  click.volume = 0.9;
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

//showing highschore to the player
function highScore(){
  if(highScor < level){
    highscoreSound.play();
    highscoreSound.volume = 0.2;
    highScor = level;
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
  backgroundM.pause();
}

//Added click event on "?", this will display help guide 
help.addEventListener("click", () => {
  helpDiv.style.display = "block";
  help.style.display = "none";
  startBtn.style.display = "none";
});

//created user help guide
const helpDiv = document.createElement("div");
helpDiv.setAttribute("style",
  "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5)"
); 
mainDiv.appendChild(helpDiv);

const div = document.createElement("div");
div.setAttribute("id", "helpDiv");
helpDiv.appendChild(div);

const para = document.createElement("p");
para.style.color = "black";
para.innerHTML = "<b>! Welcome to Simon Says !</b><br><br><b> How To Play ?</b><hr><b>Start the Game :</b> Click the Start button to begin.<br><b>Watch the Sequence :</b> The game will flash a color (or a series of colors). Memorize the sequence.<br><b>Your Turn</b> : Click the buttons in the same order as the sequence shown.<br><b>Progression : </b> Each round, a new color is added, making the sequence longer and harder.<br><b>Game Over :</b> If you make a mistake, the game ends, and your score is displayed.<br><br><b>Tips :<hr></b> Focus and try to memorize the sequence carefully.<br> Sound effects can help you remember the order of colors.";
div.appendChild(para);

//Created a button redirecting to the game
const goBackBtn = document.createElement("button");
goBackBtn.innerText = "Back";
div.appendChild(goBackBtn);

goBackBtn.addEventListener("click", () => {
  beginBtn.play();
  beginBtn.volume = 0.2;
  helpDiv.style.display = "none";
  help.style.display = "block";
  startBtn.style.display = "block";
})

