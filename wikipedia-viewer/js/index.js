// url for testing API
// https://en.wikipedia.org/w/api.php?&generator=search&action=query&prop=info&list=search&srsearch=cow&inprop=url&gsrsearch=cow&callback=%3f
$(document).ready( function() {
  

$("#search-button").click(function(json) { 
  event.preventDefault();
  var term = $("#search-term").val();
  $("#search-results").empty();
  $.ajax({
  url: 'https://www.wikipedia.org/w/api.php?&action=query&generator=search&prop=info&list=search&inprop=url&gsrsearch=' + term + '&srsearch=' + term + '&format=json&callback=?',
  dataType: 'jsonp',
  success: function(data) {
    // generate link+title+snippet  
   var myData = data.query;
   addLinks(myData);
   genResults(myData.search);
  }
    });
    
function genResults(input) {
  if(!$.trim( $("#search-results").html() ).length) {
$(input).each(function(i) {
    $("#search-results").append("<a href=" + input[i]["fullurl"] + " 'role=button'  class='btn btn-custom'> <h3>" + input[i]["title"] +"</h3>" + input[i]["snippet"] + '...' + '</a> <p> </p>');
    });  
} else {
$("#search-results").append("<a href=" + input[i]["fullurl"] + " 'role=button'  class='btn btn-custom'> <h3>" + input[i]["title"] +"</h3>" + input[i]["snippet"] + '...' + '</a> <p> </p>');
}

}
  

function addLinks(input) {
// generate array of links for results
//  start with a ranked list of results, and add URLs to that.
  var urlList = input.search;
  for (var id in input.pages)
    { $.each(urlList, function(i) {
      
        console.log('moo1');
        if (urlList[i]["title"] == input["pages"][id]["title"])
          {
           
          urlList[i]["fullurl"] = input["pages"][id]["fullurl"];  
           }
      });
     }
  input.search = urlList;
  }
  
});
});