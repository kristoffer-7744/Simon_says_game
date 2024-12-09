let gameSeq = [];
let userSeq = [];
let level=0;
let highScor = 1;
let started=false;
let btns = ["yellow", "red", "purple", "green"];
let h2= document.querySelector("h2");
let high = document.querySelector(".highscore");

document.addEventListener("keypress", function(){
  if(started==false){
    levelUp();
    started=true;
  }
 
});

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText= `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function (){
      btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(function (){
      btn.classList.remove("userflash");
  }, 100);

}

function checkAns(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp, 750);
    }

  }else{
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    h2.innerHTML = `Game over! Your score is : <b>${level}</b><br> press any key to restart the game`; 
    highScore();
    reset();
   
  }
}

function btnpPress(){
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
  btn.addEventListener("click", btnpPress);
}

function highScore(){
  if(highScor <= level){
    highScor=level;
    high.innerHTML=`Highscore : ${highScor}`;
  }
}

function reset (){
  level = 0;
  gameSeq=[];
  userSeq=[];
  started = false;
}
//code ended
