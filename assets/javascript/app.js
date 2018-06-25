//Code  SSoltis
//Use AJAX calls to 
//1. search for ip location
//2. find lat and longitude from ip addresss
//3. call foursquare to find local places with search term
//4. call foursquare with local places and find information on them to display

// search array "search"
//looks for click on button in html "#button"
//outputs to table "#table"



//Array of search terms
var ipurl = "http://api.ipstack.com/131.212.248.60?access_key=a07cea42b7d1f81063d55e1226fe0e86"
var lati=0
var long=0

var ipadd = "https://ipinfo.io/?token=$TOKEN";
// firebase search terms
var search = ["coffee"]

$.ajax({
    url: ipadd,
    method: "GET",
    async: false
}).done( function(response) {
  console.log(response.ip, response.country);
}, "jsonp")



//ajax call for location
 $.ajax({
     url: ipurl,
     method: "GET",
     async: false
   }).done(function(response){
     console.log("Success got data", response);
     lati = response.latitude;
     long = response.longitude;
    //long = response.longitude;
     //location = response.city;
     console.log(lati)
     console.log(long)
});
  

function SearchWeb(){
  //get value of button clicked
    //var SearchButton = $(this).attr("data-name");
    var SearchButton = "coffee";
  //search location for foursquare and searchbutton value
  //TODO - add limit search to 3? 4?
  var queryURL = "https://api.foursquare.com/v2/venues/search?ll="+lati+","+long+"&query="+SearchButton+"&radius=4000&limit=1&client_id=GMCZAGCA1IOH5QCGZYJGYVD0YJLAAUGUNLWUJGGOC2IIXKUU&client_secret=IJUOBHZNIW3PY124FYWWAVULHIHDSNW2OZ1GPKDW2ARO1R2V&v=20180623";

  //ajax call for search term venue
  $.ajax({
      url: queryURL,
      // params: params,
      method: "GET",
      async: false
    }).then(function(response) {
      console.log("Success got data", response);

      var results = response.response.venues
      console.log(results)
  
      for (i = 0; i < results.length; i++){
        var FourURL = "https://api.foursquare.com/v2/venues/"+results[i].id+"?&client_id=GMCZAGCA1IOH5QCGZYJGYVD0YJLAAUGUNLWUJGGOC2IIXKUU&client_secret=IJUOBHZNIW3PY124FYWWAVULHIHDSNW2OZ1GPKDW2ARO1R2V&v=20180623";
      
        $.ajax({
          url: FourURL,
          // params: params,
          method: "GET",
          async: false
        }).then(function(data) {
          console.log("Success got data", data);

          var IdResults = data.response.venue

            console.log(IdResults.name)
            console.log(IdResults.location.address)
            console.log(IdResults.shortUrl)
            console.log(IdResults.hours.status)
      
          var BusinessName = IdResults.name
          var BusinessAddress = IdResults.location.address
          var WebsiteUrl = IdResults.shortUrl
          var BusinessHours = IdResults.hours.status
              
          $("#table > tbody").append("<tr> <td>" + BusinessName + "</td> </tr>" 
         + "<tr> <td>" + BusinessAddress+ "</td> </tr>" 
         + "<tr> <td> Website: " + WebsiteUrl +"</td> </tr>" 
         + "<tr> <td>" + BusinessHours + "</td> </tr>")
       


    
        })
      }

  });
}
SearchWeb();

//onclick of button , call the new page and display search

$("#button").on("click", function(event){
  event.preventDefault();

  //grab intput from button clicked
  var ButtonValue = $("button").val().trim();

  // move to second page 

  //call render search data function
  SearchWeb();
})


