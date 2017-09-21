$(document).ready(function() {
// retrieve lat and lon coordinates using ip-api
var html= "https://cors-anywhere.herokuapp.com/http://ip-api.com/json";
$.getJSON(html, function(json) {
    obj = json;
    var lat = json.lat;
    var lon = json.lon;
    //$("#info").html(JSON.stringify(obj));
  
// now find weather
var html1= "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=cad33a7f1bebe9720bce28545232844c&units=imperial";
$.getJSON(html1, function(json) {
  obj=json;
$("#info").html(JSON.stringify(obj));
  $("#loc").html("You are currently in " + obj.name + '.');
var iconlink = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
$("#weatherIcon").attr("src", iconlink);
var weathericon = obj.weather[0].main;
$("#weather").html("Weather: " + weathericon);
temp = obj.main.temp; //default unit is F.
unit = "F";
$("#temp").html("Temp: " + temp + "\xB0" + " F");

$("#unit").on("click", function(json) {
  if (unit == "F") {
    $("#unit").html("Change to Fahrenheit");
    unit = "C";
    temp = (obj.main.temp-32)*5/9;
    
    $("#temp").html("Temp: " + temp + "\xB0" + " C");
  }
  else if (unit =="C") {
    $("#unit").html("Change to Celsius");
    unit = "F";
   temp = temp*9/5+32;
    $("#temp").html("Temp: " + temp + "\xB0" + " F");
  }
})
});
});
});