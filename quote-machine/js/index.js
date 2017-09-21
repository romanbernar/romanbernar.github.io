$(document).ready(function() {
  $.ajaxSetup({ cache: false });

var html = "";

$("#getQuote").on("click", function(json){   
  html="https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  $.getJSON(html, 
  function(json) {
    //$("#quote").html(JSON.stringify(json));
    var text="";
    text += '\"' + json.quoteText + '\"  ' + "-"+ json.quoteAuthor; 
    $("#quote").html(text);
    });
    });
});