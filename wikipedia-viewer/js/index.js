// url for testing API
// https://en.wikipedia.org/w/api.php?&generator=search&action=query&prop=info&list=search&srsearch=cow&inprop=url&gsrsearch=cow&callback=%3f

$("#submit-button").click(function(json) { 
  event.preventDefault();
  var term = $("#search-term").val();
  $("#search-results").empty();
  $.ajax({
  url: 'https://www.wikipedia.org/w/api.php?&action=query&generator=search&prop=info&list=search&inprop=url&gsrsearch=' + term + '&srsearch=' + term + '&format=json&callback=?',
  dataType: 'jsonp',
  success: function(data) {
    // generate link+title+snippet  
   addLinks(data.query);
   var buttonClicked;
   genResults(data.query.search);
    $(".search-button").click(function(result) {
 //$(".search-button").css('display', 'block');   
      $("#search-results").css('display', 'none');
});
    $("#random-button").click(function(result) {
      $("#main-frame").attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
      $("#main-frame").css('display', 'flex');
      $("#search-results").css('display', 'none');
      
    })
  goBack();
  }
    });
});




function genResults(input) {
 // if(!$.trim( $("#search-results").html()).length) {
    var obj = [];
$(input).each(function(i) {
$("#search-results").append("<button class = 'search-button' id = 'search-button" + i.toString() + "'>" + "<h3>" + input[i]["title"] +"</h3>" + input[i]["snippet"] + '...' + "</button>");
 obj.push(input[i]["fullurl"]);
// if(i==1) { alert('moo');};
  $("#search-button" + i.toString()).click(function() {
     $("#main-frame").css('display', 'flex');
    $("#main-frame").attr("src", obj[i]);
    
  });
    });  
}
  

function addLinks(input) {
// generate array of links for results
//  start with a ranked list of results, and add URLs to that.
  var urlList = input.search;
  for (var id in input.pages)
    { $.each(urlList, function(i) {
        if (urlList[i]["title"] == input["pages"][id]["title"])
          {
           
          urlList[i]["fullurl"] = input["pages"][id]["fullurl"];  
           }
      });
     }
  input.search = urlList;
  }

function goBack() {
$("#back-button").click(function(result) {  
  if ($("#search-results").css('display') == 'flex' && 
     $("#search-results").css('src').length > 0) {
      $("#search-results").css('display', 'none');
  $("#main-frame").css('display', 'flex');
  } else if ($("#main-frame").css('display') == 'flex') {
     $("#main-frame").css('display', 'none');
     $("#search-results").css('display','flex');
  }
});
}