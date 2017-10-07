// retrieve lat and lon coordinates using ip-api
//var html= "https://cors-anywhere.herokuapp.com/http://jsonip.org";
getPosition().then((position) => {
      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      var html= "https://api.apixu.com/v1/forecast.json?key=216d30fcc973455aab3144309172309&q=" + lat + "," + lon + "&days=6&hour=6" ;
 $.getJSON(html, function(obj) {
//$("#info").html(JSON.stringify(obj));
  $("#loc").html("You are currently in " + obj.location.name + ", " + obj.location.region + "<p> and the local time is:  " + obj.location.localtime +  '.</p>');
 /*
$('#weather').append('<p>' + obj.current.condition.text + '</p>' + obj.current.precip_in + ' in precipitation</p>' + 
 '<p>' + obj.current.humidity + '% humidity</p> ' + '<p>' + obj.current.wind_mph + ' mph at ' + obj.current.wind_dir + '</p>' + '<p>' + obj.current.vis_miles + '9 miles visibility');*/
 for(i=0;i<5;i++) {
 weatherColAppend(i);  
 }
var temp = obj.current.temp_f; //default unit is F, which we get by setting updateUnitTo to convert to F.
unit = "F";
/* $("#temp").html("Temp: " + temp + "\xB0" + unit + ". Feels like: " + obj.current.feelslike_f); */

$("#unit").on("click", function() {
  // on click, convert unit.
  if (unit === "F") {
 
   updateUnitTo(obj, unit);
    unit = "C";
    $("#temp").html("Temp: " + temp + "\xB0" + " C. Feels like: " + obj.current.feelslike_f); 
  }
  else if (unit === "C") {
  
    updateUnitTo(obj, unit);
      unit = "F";
    $("#unit").html("Change to Celsius");
  $("#temp").html("Temp: " + temp + "\xB0" + " F. Feels like: " + obj.current.feelslike_c);  
  }
});

     
 function weatherColAppend(num) {
   if (num == 0) {
     $('#temp').html("<h4 class= 'title'>Current Temperature</h4>" + obj.current.temp_f + "\xB0 F / " + obj.current.temp_c + "\xB0 C<p> Feels like: " + obj.current.feelslike_f + "\xB0 F / " + obj.current.feelslike_c + "\xB0 C </p>");
     $('#weather').append("<p><img src ='" + obj.current.condition.icon  +  "'</p>" + '<p>' + obj.current.condition.text + '</p>' + obj.current.precip_in + ' in precipitation</p>' + 
 '<p>' + obj.current.humidity + '% humidity</p> ' + '<p>Wind ' + obj.current.wind_mph + ' mph at ' + obj.current.wind_dir + '</p>' + '<p>' + obj.current.vis_miles + '9 miles visibility'); 
   } else {  
 //alert(obj.forecast.forecastday);
 var ref = obj.forecast.forecastday[num];
 $('#weathercol' + num).append("<p class = 'title'>" + ref.date + "</p>" + '<p><img src ="' + ref.day.condition.icon  +  '">' + ref.day.condition.text + '</p><p>' + "<u><p class= 'title2'>High</p></u>" + ref.day.maxtemp_f + "\xB0 F / " + ref.day.maxtemp_c + "\xB0 C" + "<p>" + "<u><p class = 'title2'> Low</p></u>" + ref.day.mintemp_f + "\xB0 F / " + ref.day.mintemp_c + "\xB0 C<p>"  + ref.day.totalprecip_in + ' in precipitation</p>' + '<p>' + ref.day.avghumidity + '% humidity</p> ' + '<p>' + ref.day.maxwind_mph + ' mph</p>' + '<p>' + ref.day.avgvis_miles + ' miles visibility');
 }  
 }
  
   
  function updateUnitTo(obj,unit) {
  if (unit === "F") {
  $("#unit").html("Change to Fahrenheit");
   temp = ((temp-32)*5/9).toFixed(2);
  } else {
     $("#unit").html("Change to Celsius");
     temp = (temp*9/5+32).toFixed(2);
}
}
});
      })
.catch( error =>  console.log(error));

  function getPosition() {
    // returns a promise for geolocation
    var geo = navigator.geolocation;
    return new Promise((resolve,reject) => {
        geo.getCurrentPosition((position) => { 
resolve(position);           
   },
                               () => reject('Browser does not support geolocation.')
                              );
    }); 
    }