//Initialize Firebase
var config = {
    apiKey: "AIzaSyDf2FIuyY6UKCUuCpihnYA-1OSWKSEe9jY",
    authDomain: "groupproject1-955fc.firebaseapp.com",
    databaseURL: "https://groupproject1-955fc.firebaseio.com",
    projectId: "groupproject1-955fc",
    storageBucket: "groupproject1-955fc.appspot.com",
    messagingSenderId: "1029016705388"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

// Array to hold button options
var options = ["Study", "Beer", "Coffee", "Gas"];


  //Array of search terms
  var ipurl = "http://api.ipstack.com/131.212.248.60?access_key=a07cea42b7d1f81063d55e1226fe0e86"
  var lati=0
  var long=0


database.ref().push({
    study: "Study",
    beer: "Beer",
    food: "Coffee",
    gas: "Gas",
});

// Function to display buttons
function renderButtons() {

    $("#clickBtn").empty();
    $("#table > tbody").empty();
    $(".mainsection").removeClass("section")

    // Looping through the array
    for (var i = 0; i < options.length; i++) {

        // Dynamicaly generating buttons for each options in the array
        var btn = $("<button>");
        btn.addClass("button");
      
        // Adding a data-attribute
        btn.attr("data-name", options[i]);
        // Providing the initial button text
        btn.text(options[i]);
        // Adding the button to the buttons-view div
        $("#clickBtn").append(btn);
    }

}


// Calling the renderButtons function to display the intial buttons
renderButtons();

  //onclick of button , call the new page and display search
   //document.getElementsByName("button").onclick = displayInfo
  $(document).on("click", ".button", displayInfo);
  $(document).on("click", ".Back", renderButtons);

  //TODO - pull text info from 
  function displayInfo(){

    // move to second page indexp2.html

   // window.location.href = "indexp2.html"

  
    //event.preventDefault();

    console.log((this));

    console.log($(this).attr("data-name"));

    //grab input from button clicked
    ButtonValue = $(this).attr("data-name")
    

    console.log(ButtonValue)
    
    var ButtonValueClick = ButtonValue.innerHTML;

    console.log(ButtonValueClick)

    $("#clickBtn").empty();
    // Dynamicaly generating buttons for each options in the array
    var button = $("<button>");
    button.addClass("Back");
   
    
    // Adding a data-attribute
    button.attr("data-name", "Back");
    // Providing the initial button text
    button.text("Back");
    // Adding the button to the buttons-view div
    $("#clickBtn").append(button);
    $(".mainsection").addClass("section")
    

    


  var ipadd = "https://ipinfo.io/?token=$TOKEN";
 

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
    //call render search data function
    SearchWeb(ButtonValue);
  };


  function renderResults(data) {
    console.log("Success got data", data);

    var IdResults = data.response.venue

    if(typeof(IdResults.hours)=="undefined"){
   
        var BusinessHours = "None"
    }else{
        console.log(IdResults.hours.status)
        var BusinessHours = IdResults.hours.status
    }
      console.log(IdResults.name)
      console.log(IdResults.location.address)
      console.log(IdResults.shortUrl)
      console.log(BusinessHours)
      

    var BusinessName = IdResults.name
    var BusinessAddress = IdResults.location.address
    var WebsiteUrl = IdResults.shortUrl
    
        
    $("#table > tbody").append("<div> <tr> <td>" + BusinessName + "</td> </tr>" 
  + "<tr> <td>" + BusinessAddress+ "</td> </tr>" 
  + "<tr> <td> <br> <a href='" + WebsiteUrl +"'>Website</a></td> </tr><br>" 
  + "<tr> <td>" + BusinessHours + "</td> </tr> </div><br>")
  }


  function SearchWeb(search){
    //get value of button clicked


      //var SearchButton = $(this).attr("data-name");
      var SearchButton = search;
      console.log(search)
    //search location for foursquare and searchbutton value
    //TODO - add limit search to 3? 4?

    
    var queryURL = "https://api.foursquare.com/v2/venues/search?ll="+lati+","+long+"&query="+SearchButton+"&radius=4000&limit=1&client_id=5MSXZF21SC1HYLZTM2TNULYNLXU3SZ3L5OY5PPKONAZQJNNW&client_secret=PWA55PPGLPWVB2F34AWNYT4YX4TNQS0JRN0Y2H0Q4WPCNQTZ&v=20180623";

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
          var FourURL = "https://api.foursquare.com/v2/venues/"+results[i].id+"?&client_id=5MSXZF21SC1HYLZTM2TNULYNLXU3SZ3L5OY5PPKONAZQJNNW&client_secret=PWA55PPGLPWVB2F34AWNYT4YX4TNQS0JRN0Y2H0Q4WPCNQTZ&v=20180623";
        
          $.ajax({
            url: FourURL,
            // params: params,
            method: "GET",
            async: false
          }).then(function(data) {
            renderResults(data)
        


      
          })
        }

    });
  }