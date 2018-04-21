
var personObject = {piece: 'x', pieceArray: [], player:"person",  turn: 0, turnOrder: 0};
var computerObject = {piece: 'o', pieceArray: [], player:"computer",  turn: 0, turnOrder: 0};
var gameObject = {turn: 0, player: '', condition: 'play', pieceArray: []};
createGrid();

function createGrid() {

document.getElementById("sq1").onclick = function() {
placePiece(1, personObject);
};
document.getElementById("sq2").onclick = function() {
placePiece(2, personObject);
};
document.getElementById("sq3").onclick = function() {
placePiece(3, personObject);
};
document.getElementById("sq4").onclick = function() {
placePiece(4, personObject);
};
document.getElementById("sq5").onclick = function() {
placePiece(5, personObject);
};
document.getElementById("sq6").onclick = function() {
placePiece(6, personObject);
};
document.getElementById("sq7").onclick = function() {
placePiece(7, personObject);
};
document.getElementById("sq8").onclick = function() {
placePiece(8, personObject);
}
document.getElementById("sq9").onclick = function() {
placePiece(9, personObject);
}
}
//OPTIONS SETUP

document.getElementById("x-img").onclick = function() {
 personObject.piece = 'x';
 computerObject.piece = 'o';
}

document.getElementById("o-img").onclick = function() {
 personObject.piece = 'o';
 computerObject.piece = 'x';
}

document.getElementById("first-button").onclick = function() {
personObject.turnOrder = 1;
computerObject.turnOrder = 2;
};
document.getElementById("second-button").onclick = function() {
personObject.turnOrder = 2;
computerObject.turnOrder = 1;
};
document.getElementById("randomize-button").onclick = function() {
determineTurn();
};
document.getElementById("play-button").onclick = startGame;

// FUNCTIONS
function determineTurn() {
  if (Math.random() < 0.5) {
   personObject.turnOrder = 1;
   computerObject.turnOrder = 2;
  } else {
   personObject.turnOrder = 2;
   computerObject.turnOrder = 1;
   }
}

function startGame() {
document.getElementById('game-grid-container').style.display = 'inline-grid';
document.getElementById('options-grid-container').style.display = 'none';
if (personObject.turnOrder == 0) {
  personObject.turnOrder = 1;
  gameObject.player = 'person';
  computerObject.turnOrder = 2;
}
gameObject.turn = 0;
personObject.turnOrder < 2 ? gameObject.player = 'person' : gameObject.player = 'computer';
updateConsole();
  if( personObject.turnOrder > 1) {
    startTurn(computerObject);
  }
}

function placePiece(num, object, array = []) {
  var player = object.player;
    if (player != gameObject.player) {
    return;
    }
  if (gameObject.condition != "play") {
    
    return;
  }
if (player == 'person') {
    if (gameObject.pieceArray.indexOf(num) > -1) {
      alert('illegal move. Try something else.');
      return 0;
    }
   if (personObject.piece == 'x') {
      xPlace(num);
  } else {
      oPlace(num);
  }
    personObject.turn++;
   personObject.pieceArray.push(num);
    gameObject.pieceArray.push(num);
  if (gameObject.turn < personObject.turn) {
    gameObject.turn++;
  }
  if (object.turn > 2) {
   checkWinAll(object);
    }
    gameObject.player = 'computer';
   
    updateConsole();
    startTurn(computerObject);
} else if (player == 'computer') {
 if (computerObject.piece == 'x') {
    xPlace(num);
} else {
    oPlace(num);
}
  computerObject.turn++;
  computerObject.pieceArray.push(num);
  gameObject.pieceArray.push(num);
   if (gameObject.turn < computerObject.turn) {
    gameObject.turn++;
  }
   if (gameObject.turn > 2) {
   checkWinAll(object);
    } 
  gameObject.player = 'person';
  updateConsole();
}
     
function oPlace(num) {
  gameObject.pieceArray.push(num);
  var oImg = document.createElement("img");
  var oURL =  "http://res.cloudinary.com/percowa/image/upload/c_fit,g_center,h_119,r_4,w_113,x_5,y_0/a_0/v1504918757/ttto_ufaaml.png";
  oImg.setAttribute("src",oURL);
  document.getElementById('sq' + num).appendChild(oImg);
}
function xPlace(num) {
  gameObject.pieceArray.push(num);
  var xImg = document.createElement("img");
  var xURL = "http://res.cloudinary.com/percowa/image/upload/c_crop,h_134,w_125/v1504918756/tttx_uzbklr.png";
  xImg.setAttribute("src",xURL);
   document.getElementById('sq' + num).appendChild(xImg);
  }
  } // end of placePiece()


function updateConsole() {
document.getElementById('console-info').innerHTML = 'Turn: ' + gameObject.turn + ' player:  ' + gameObject.player;
}

    
function startTurn(object) {
 if (object == computerObject && personObject.turn < computerObject.turn) {
      return;
    }
  if (personObject.turn + computerObject.turn == 9) {
   endGame(personObject.player,'tie');
   return;
  }
  gameObject.player = object.player;
  updateConsole();
  if (object.player == "computer") {  
   if (personObject.turn > 1) {
    //check if the player is one move away from winning and if so defensively counter
   if(hardCounter() == 1) {
    return;
   }
   if(imminentWin() == 1) {
   // place piece and set condition to win
   return;
   }
   }
  var arr = [5,1,3,7,9];
    if (gameObject.turn > 1) {
    arr.push(2,4,6,8);
    }
placePiece(checkPiece(arr), computerObject);
    }
}
  // end of startTurn

    function checkPiece(arr) {
  // checks if piece is already used
var moveArr = [];
for(var i=0;i<arr.length;i++) {
if(personObject.pieceArray.indexOf(arr[i]) == -1 && computerObject.pieceArray.indexOf(arr[i]) == -1) {
return arr[i];
}    
 
  } 
      return 0; 
    }
 
      function hardCounter() {
 var condition = 0; //return the threat if score is 2.
 var array;
while (condition < 1) {
checkThreat([1,4,7]);
checkThreat([2,5,8]);
checkThreat([3,6,9]);
checkThreat([1,2,3]);
checkThreat([4,5,6]);
checkThreat([7,8,9]);
checkThreat([1,5,9]);
checkThreat([3,5,7]);
break;
      }
 return condition;
      
   function checkThreat(path) {
for(i=0;i<path.length;i++) {
if(personObject.pieceArray.indexOf(path[i]) > -1) {
 path.splice(i,1);
 i--;
}
}
if (path.length == 1 && computerObject.pieceArray.indexOf(path[0]) < 0) {
placePiece(path[0], computerObject)
condition++;
}
   }
 }

        
 function imminentWin() {
   // checks if current player has a winning move available to them. This is a converse of sorts to hardCounter().
  var condition = 0; //return the threat if score is 2.
 var array;
while (condition < 1) {
winMove([1,4,7]);
winMove([2,5,8]);
winMove([3,6,9]);
winMove([1,2,3]);
winMove([4,5,6]);
winMove([7,8,9]);
winMove([1,5,9]);
winMove([3,5,7]);
break;
      }
return condition;
   
function winMove(path) {
  for(i=0;i<path.length;i++) {
if(computerObject.pieceArray.indexOf(path[i]) > -1 && personObject.pieceArray.indexOf(path[i]) == -1) {
 path.splice(i,1);
 i--;
}
}
if (path.length == 1 && personObject.pieceArray.indexOf(path[0]) == -1) {
placePiece(path[0], computerObject);
endGame(computerObject.player,'win');
condition++;
} else {
return;
}
}
      } 
 
function checkWinAll(obj) {
  var player = obj.player;
  while(gameObject.condition != "win") {
checkWin(1,4,7);
checkWin(2,5,8);
checkWin(3,6,9);
checkWin(1,2,3);
checkWin(4,5,6);
checkWin(7,8,9);
checkWin(1,5,9);
checkWin(3,5,7);
  break;
  }
  
  function checkWin(a,b,c) { 
if (obj.pieceArray.indexOf(a) != -1 && obj.pieceArray.indexOf(b) != -1 && obj.pieceArray.indexOf(c) != -1) {
endGame(player,'win');
return 1;
} else 
  {
    return 0;
  }
 
}
} //end of checkWinAll

 
function endGame(player,condition) {
  var msg;
  if (condition == 'win') {
gameObject.condition = 'win';
msg = document.createTextNode(player + ' ' + condition + "s!");
 document.getElementById("end-screen").appendChild(msg);
  } else if (condition == 'tie') {
 gameObject.condition = 'tie';
 msg = document.createTextNode('Tied!');
  document.getElementById("end-screen").appendChild(msg);
  }

document.getElementById("end-screen").style.display = 'inline';
document.getElementById('reset-button').onclick = function() {gameReset()};  
  
function gameReset() {
initVars();
for (i=1; i < 10; i++) {
  while(document.getElementById('sq' + i).firstChild) {   
document.getElementById('sq' + i).removeChild(document.getElementById('sq' + i).firstChild);
}
}
 document.getElementById("game-grid-container").style.display = 'none';
document.getElementById('end-screen').removeChild(msg); 
document.getElementById("end-screen").style.display = 'none';
document.getElementById('options-grid-container').style.display = 'inline';
  
function initVars() {
document.getElementById('console-info').innerHTML = '';
personObject = {piece: 'x', pieceArray: [], player:"person",  turn: 0, turnOrder: 0};
computerObject = {piece: 'o', pieceArray: [], player:"computer",  turn: 0, turnOrder: 0};
gameObject = {turn: 0, player: '', condition: 'play', pieceArray: []};
emptyArray = [];
}
}
}