//http://res.cloudinary.com/percowa/image/upload/v1522373760/panoramic-3267048_1920_xrylkr.jpg
// for future iterations: add farm words + farm pics + farm background. If you're feeling particularly brave, try implementing the circular counter. Also, make all the buttons light up when you win. 
var isPlayerTurn = 0 /* when 0, computer is going, when 1 player is chosing seq*/, turn = 0; seqCount = 0, isStrict = 0,  seqArr = [], playerSeqArr = [];
var q0 = {id: 'q0', color1: 'red', color2: '#ED2F68'};
var q1 = {id: 'q1', color1: 'pink', color2: 'grey'};
var q2 = {id: 'q2', color1: 'green', color2: 'orange' };
var q3 = {id: 'q3', color1: 'yellow', color2: 'blue'};
var simonArr = [{id: 'q0', color1: 'red', color2: '#ED2F68', audioSourceURL: 'https://s3.us-east-2.amazonaws.com/freecodecamp14/Rooster.wav'}, {id: 'q1', color1: 'pink', color2: 'grey', audioSourceURL: 'https://s3.us-east-2.amazonaws.com/freecodecamp14/pig.wav'}, {id: 'q2', color1: 'green', color2: 'orange', audioSourceURL: 'https://s3.us-east-2.amazonaws.com/freecodecamp14/cow.wav' }, {id: 'q3', color1: 'yellow', audioSourceURL: 'https://s3.us-east-2.amazonaws.com/freecodecamp14/sheep.wav', color2: 'blue'}];
document.getElementById('turn-count').textContent = 'Turn ' + turn;
document.getElementById('play-button').addEventListener('click', function(event) {
for(i=1;i<4;i++) {
 countDown(i);
}
window.setTimeout(function(e) {
document.getElementById('msg').textContent = '';
resetCount();
startSeq();
}, 5000);
});
simonArr.forEach(addClick);

document.getElementById('strict-button').addEventListener('click', function(event) {
isStrict = 1;
for(i=1;i<4;i++) {
 countDown(i);
}
window.setTimeout(function(e) {
document.getElementById('msg').textContent = '';
resetCount();
startSeq();
}, 5000);
})

function countDown(i) {
window.setTimeout(function(e) {
document.getElementById('msg').innerHTML = 'Starting in...' + (4-i);
}, 1000*i)
}

function addClick(quarter,index) {
document.getElementById(quarter.id).addEventListener('click', function() {
 lightUpQuarter(quarter);
  {
if (isPlayerTurn == 1) {
         playerSeqArr.push(quarter);        
   if(playerSeqArr[playerSeqArr.length-1] != seqArr[playerSeqArr.length-1]) {
     switch(isStrict) {
      case 0: wrongCount();
         break;
      case 1:
         document.getElementById('msg').textContent = 'MOOINAWK! You picked the wrong thing. Will you win next time? Let\'s FIND OUT!';
         resetCount(); 
         break;
} } else if (playerSeqArr.length == seqArr.length && turn < 4) {
      turn++;
        document.getElementById('turn-count').textContent = 'turn ' + turn;
    document.getElementById('msg').textContent = 'Correct! Proceeding to  next level!';
  window.setTimeout(function() {
    document.getElementById('msg').textContent = ''; }, 1500);
  isPlayerTurn = 0;
  playerSeqArr = [];
  seqCount = 0;
  document.getElementById('seq-count').textContent = 'Counter ' + seqCount;
  startSeq();
} else if (turn == 4) {
document.getElementById('msg').textContent = 'CONGRATULATIONS! You made it to this pre-defined point. You can ignore this message and keep playing, which I wouldn\'t particularly care to do. But, you rock! Have a nice day!';
} else {
 seqCount++;
  document.getElementById('seq-count').textContent = 'Counter ' + seqCount;
}
    }
}
  });
  
function wrongCount() {
document.getElementById('msg').textContent = 'Wrong button! Standby for correct one, and then try again!';
playerSeqArr.pop();
playerSeqArr = [];
seqCount = 0;
setTimeout(function() {
document.getElementById('msg').textContent = '';  
document.getElementById('seq-count').textContent = 'Counter ' + 0;  
lightUpQuarter(seqArr[seqArr.length-1]);
}, 500);
 }
}

function resetCount() {
turn = 0, seqCount = 0;
seqArr = [], playerseq = [];
document.getElementById('seq-count').textContent = 'Counter ' + seqCount;
document.getElementById('turn-count').innerHTML = 'Turn ' + turn;
}

function startSeq() {
var pick = simonArr[Math.floor(Math.random() * simonArr.length)];
seqArr.push(pick);
for (let i = 0; i < seqArr.length;i++) {
  intervalLightUp(seqArr[i],i);
}
//seqArr.forEach(intervalLightUp);
isPlayerTurn = 1;
  
function intervalLightUp(quarter,i) {
  window.setTimeout(function(e) {
  lightUpQuarter(quarter);
    }
  ,1500*(i+1));
}
}

function lightUpQuarter(quarter) {
document.getElementById(quarter.id).style.backgroundColor = quarter.color2;
var audio = new Audio(quarter.audioSourceURL);
audio.volume = 0.8;
audio.play();
window.setTimeout(function(e) {
document.getElementById(quarter.id).style.backgroundColor = quarter.color1;
} ,1000);
}