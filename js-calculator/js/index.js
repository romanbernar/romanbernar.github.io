var mem,numStr, numStored, opp='', decimalDigit=-1, digit=0, numMem=0, numNew=0, digRatio=0;
$("#mc").click(function() {
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
$("#0").click(function() {
digitAdd(0);
})
$("#1").click(function() {
digitAdd(1);
})
$("#2").click(function() {
digitAdd(2);
})
$("#3").click(function() {
digitAdd(3);
})
$("#4").click(function() {
digitAdd(4);
})
$("#5").click(function() {
digitAdd(5);
})
$("#6").click(function() {
digitAdd(6);
})
$("#7").click(function() {
digitAdd(7);
})
$("#8").click(function() {
digitAdd(8);
})
$("#9").click(function() {
digitAdd(9);
})

$("#dec").click(function() {
if (numStr.indexOf('.') > -1) {
return;
} else if (digit === 0) {
numStr = "0";
}
decimalDigit = digit;
$("#full-display").html(numStr + ".");
$("#feedback-display").append(".");
})

$("#ce").click(function() {
decimalDigit=-1, digit=0, numNew=0;
numStr = numNew.toString();
$("#full-display").html(numStr);
$("#feedback-display").html('');
});

$("#onClear").click(function() {
console.log('moo');
decimalDigit=-1, digit=0, numNew=0, numStored = 0;
numStr = "CLEAR", opp = "";
$("#full-display").html(numStr);
$("#feedback-display").html('');
});

$("#add").click(function() {
if (stopInput() == 1) {
 return;
}  
$("#feedback-display").append('+');
oppExec();
opp = 'plus';
numNewReset();
})
$("#subtract").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('- ');
oppExec();
opp = 'minus';
numNewReset();
})
$("#multiply").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('x ');
oppExec();
opp = 'times';
numNewReset();
})
$("#division").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('/ ')
oppExec();
opp = 'division';
numNewReset();
})
$("#equals").click(function() {
if (stopInput() == 1) {
 return;
}
$("#feedback-display").append('=');
oppExec();
})

$("#m-").click(function() {
$("#full-display").html(numStr);
})
$("#m+").click(function() {
$("#full-display").html(numStr);
})
$("#percent").click(function() {
numNew *= 100;
numStr = numNew.toFixed()
$("#full-display").html(numStr);
})

$("#sqrt").click(function() { 
if (opp !== '') {
// treat sqrt button as an equals sign + SQRT
oppExec();
}  
if( numNew < 0) {
$("#full-display").html("ERROR");
$("#feedback-display").html("IMAGINARY NUMBER");
return;  
} 
numNew = Math.sqrt(numNew);
numStr = numNew.toFixed(digit-decimalDigit)
$("#full-display").html(numStr);
$("#feedback-display").append("SQRT");
});

function stopInput() {
 console.log($("#feedback-display").html().length);
if (digit>8) {
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
digit++;
digRatio = digit - decimalDigit;
//adds non-zero digit to Display
if (decimalDigit === -1) {
numNew = numNew * 10 + n;
numStr = numNew.toString();    
} else {
numNew = numNew + n/Math.pow(10,digit-decimalDigit);
numStr = numNew.toFixed(digit - decimalDigit).toString();
}
$("#full-display").html(numStr);
}

function numNewReset(){
decimalDigit=-1, digit=0, numNew = 0;
numStr = numNew.toString();
$("#full-display").html(numStored);
}

function oppExec(){
if (opp !== '') {
switch (opp) {
  case 'plus':
    numStored += numNew;
    opp = '';
    break;
  case 'minus':
    numStored -= numNew;
    opp = '';
    break;
  case 'times':
    numStored *= numNew;
    opp = '';
    break;
  case 'division':
     if (numNew === 0) {
    $("#full-display").html("ERROR");  
    $("#feedback-display").html("DIVISION BY ZERO");
    opp = '';
    return;
    }
    numStored /= numNew;
    opp = '';
    break;
  default:
    break;
          }
numStr = numStored.toFixed(Math.max(digit-decimalDigit,numNew.toString().length -1).toString());
$("#full-display").html(numStr);  
numNew = numStored;
} else {
            numStored = numNew;
          }
}