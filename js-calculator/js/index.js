var mem,numStr, numStored, operation ='', decimalPlace = -1, totalDigits=0, numMem=0, numNew=0;
addClicks();

function addClicks() {
$("#mc").click( ()  =>  {
var out = stopInput();
if (out == 1) {
 return;
}
numMem = 0;
$("#full-display").html("m=0");
$("#feedback-display").append("MC ");
})
$("#mr").click(function() {
if (stopInput() == 1) {
 return;
}
$("#full-display").html(numMem);
$("#feedback-display").append("MR ");
})
$("#mem-minus").click(function() {
if (stopInput() == 1) {
 return;
}
numMem -= numNew;
$("#full-display").html("m=" + numMem);
$("#feedback-display").append("M- ");
})
$("#mem-plus").click(function() {
if (stopInput() == 1) {
 return;
}
numMem += numNew;
$("#full-display").html("m=" + numMem);
$("#feedback-display").append("M+ ");
})
  
 //number inputs, 1,2,3, etc.
  
  for(let i=0;i<10;i++) {
   $("#" + i).click(function() {
   digitAdd(i);
   });
  }
  
$("#dec").click(function() {
if (numStr.indexOf('.') > -1) {
return;
} else if (totalDigits === 0) {
numStr = "0";
}
decimalPlace = totalDigits;
$("#full-display").html(numStr + ".");
$("#feedback-display").append(".");
})

$("#ce").click(function() {
decimalPlace=-1, totalDigits=0, numNew=0;
numStr = numNew.toString();
$("#full-display").html(numStr);
$("#feedback-display").html('');
});

$("#onClear").click(function() {
console.log('moo');
decimalPlace=-1, totalDigits=0, numNew=0, numStored = 0;
numStr = "CLEAR", operation = "";
$("#full-display").html(numStr);
$("#feedback-display").html('');
});

$("#add").click(function() {
if (stopInput() == 1) {
 return;
}  
$("#feedback-display").append('+');
operationExec();
operation = 'plus';
numNewReset();
})
$("#subtract").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('- ');
operationExec();
operation = 'minus';
numNewReset();
})
$("#multiply").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('x ');
operationExec();
operation = 'times';
numNewReset();
})
$("#division").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('/ ')
operationExec();
operation = 'division';
numNewReset();
})
$("#equals").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('=');
operationExec();
})

$("#m-").click(function() {
  if (stopInput() == 1) {
  return;
}
$("#full-display").html(numStr);
})
  
$("#m+").click(function() {
if (stopInput() == 1) {
  return;
}
$("#full-display").html(numStr);
})
  
$("#percent").click(function() {
if (stopInput() == 1) {
  return;
}
  if (totalDigits > 1) {
numNew = numNew/Math.pow(10,totalDigits-decimalPlace-1);
numStr = numNew.toFixed(totalDigits - decimalPlace+1).toString();
} else {
numNew = numNew/Math.pow(10,totalDigits-decimalPlace);
numStr = numNew.toFixed(totalDigits - decimalPlace+1).toString();
}
$("#feedback-display").append("% ");
$("#full-display").html(numStr);
})

$("#sqrt").click(function() { 
  if (stopInput() == 1) {
  return;
}
if (operation !== '') {
// treat sqrt button as an equals sign + SQRT
operationExec();
}  
if( numNew < 0) {
$("#full-display").html("ERROR");
$("#feedback-display").html("IMAGINARY NUMBER");
return;  
} 
numNew = Math.sqrt(numNew);
numStr = numNew.toFixed(totalDigits-decimalPlace)
$("#full-display").html(numStr);
$("#feedback-display").append("SQRT");
});
}

function stopInput() {
 console.log($("#feedback-display").html().length);
if (totalDigits>8) {
return 1;
} else if ($("#feedback-display").html().indexOf("ERROR") > -1) {
  return 1;
} else if ($("#feedback-display").html().length > 12) {
$("#feedback-display").html("");
  return 0;
} else {
return 0;
}
}

function digitAdd(n) {
  if ($("#feedback-display").html().substr(-1) === "=" || stopInput() == 1) {
 return;
}
$("#feedback-display").append(n);
totalDigits++;
var digitRatio = totalDigits - decimalPlace;
//adds non-zero digit to Display
if (decimalPlace === -1) {
numNew = numNew * 10 + n;
numStr = numNew.toString();    
} else {
numNew = numNew + n/Math.pow(10,totalDigits-decimalPlace);
numStr = numNew.toFixed(totalDigits - decimalPlace).toString();
}
$("#full-display").html(numStr);
}

function numNewReset(){
decimalPlace=-1, totalDigits=0, numNew = 0;
numStr = numNew.toString();
$("#full-display").html(numStored);
}

function operationExec(){
if (operation !== '') {
switch (operation) {
  case 'plus':
    numStored += numNew;
    operation = '';
    break;
  case 'minus':
    numStored -= numNew;
    operation = '';
    break;
  case 'times':
    numStored *= numNew;
    operation = '';
    break;
  case 'division':
     if (numNew === 0) {
    $("#full-display").html("ERROR");  
    $("#feedback-display").html("DIVISION BY ZERO");
    operation = '';
    return;
    }
    numStored /= numNew;
    operation = '';
    break;
  default:
    break;
          }
numStr = numStored.toFixed(Math.max(totalDigits-decimalPlace,numNew.toString().length -1).toString());
$("#full-display").html(numStr);  
numNew = numStored;
} else {
            numStored = numNew;
          }
}