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
<<<<<<< HEAD
=======
 
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
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
<<<<<<< HEAD
      setTimeout(levelUp, 500);
=======
      setTimeout(levelUp, 750);
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
    }

  }else{
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function (){
<<<<<<< HEAD
      document.querySelector("body").style.backgroundColor = "black";
    }, 150);

    h2.innerHTML = `Game over! Your score is : <b>${level}</b><br> press any key to restart tha game`; 
=======
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    h2.innerHTML = `Game over! Your score is : <b>${level}</b><br> press any key to restart the game`; 
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
    highScore();
    reset();
   
  }
}

<<<<<<< HEAD
function btnPress(){
=======
function btnpPress(){
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
<<<<<<< HEAD
for(let btn of allBtns){
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress);
=======
for(btn of allBtns){
  btn.addEventListener("click", btnpPress);
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
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
<<<<<<< HEAD
}
=======
}
//code ended
>>>>>>> 37b724b7c42315a090277d026e3b474c7d1defb5
