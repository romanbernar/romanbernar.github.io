//https://s3.us-east-2.amazonaws.com/freecodecamp14/cow-moo1.wav

var min = 25, sec = 0, setMin=25, setSec=0, timeStr ="25:00", intervalId, timerSwitch=0;
document.getElementById('time').textContent = timeStr;
document.getElementById("stop-button").onclick = function() {
 if (timerSwitch == 0) {
   timerSwitch = 1;
   intervalId = startTimer(); 
   } else {
     stopTimer(intervalId);
     timerSwitch = 0;
   }
 };
document.getElementById("reset-button").onclick = function() {getSetTime();};
clickToAdjust();
document.getElementById("adjust-button").onclick = function() {
var eSec = document.getElementById("sec-select-list");
var eMin = document.getElementById("min-select-list");
setSec = eSec.options[eSec.selectedIndex].value;
  if (setSec === -1) {
setSec = 0;
  }
setMin = eMin.options[eMin.selectedIndex].value;
getSetTime();
}


function startTimer() {
 /*if(typeof intervalId != "undefined") {
 return;
 }*/ 
 return setInterval(function() {
   if (min + sec == 0 && timerSwitch == 1) {
     var audio = new Audio('https://s3.us-east-2.amazonaws.com/freecodecamp14/cow-moo1.wav');
     audio.play();
     timerSwitch = 0;
sec=0;
timeStr = '0:00';
stopTimer(intervalId);
return;
}
 if (sec == 0) {
min--;
sec = 59;
} else {
sec--;  
}
if (sec < 10) {
timeStr = min + ':' + '0' + sec;
} else {
timeStr = min + ':' + sec;
}
document.getElementById('time').textContent = timeStr;
}, 1000); 
}

function stopTimer(id) {
clearInterval(id);
id = 0;
//document.getElementById('time').textContent = timeStr;
}

function clickToAdjust() {
var str = '';
var eSelect = document.createElement("select");
var tempOption,num, prop;
  
  for(i=0;i<60;i++) {
tempOption = document.createElement("option");
num = document.createTextNode(i.toString());
tempOption.appendChild(num);
tempOption.setAttribute('value',i)
eSelect.appendChild(tempOption);
}
var minSelect = eSelect.cloneNode(1);
var minText = document.createTextNode("mins");
minSelect.setAttribute('id', 'min-select-list');
var selectContainer = document.getElementById("select-container");
selectContainer.appendChild(minSelect);
selectContainer.appendChild(minText);

var secSelect = eSelect.cloneNode(1);
var secText = document.createTextNode("secs");
secSelect.setAttribute('id', 'sec-select-list');
secSelect.appendChild(secText);
selectContainer.appendChild(secSelect);
selectContainer.appendChild(secText);
}

function getSetTime(){
sec = setSec;
min = setMin;
if (sec < 10) {
timeStr = min + ':' + '0' + sec;
} else {
timeStr = min + ':' + sec;
} 
document.getElementById('time').textContent = timeStr;  
}