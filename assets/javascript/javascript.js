//Initial Global Variables
var ipurl = "http://api.ipstack.com/131.212.248.60?access_key=a07cea42b7d1f81063d55e1226fe0e86"
var lati=0
var long=0


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

database.ref().push({
    study: "Study",
    beer: "Beer",
    food: "Coffee",
    gas: "Gas",
});


// Function to display buttons
function renderButtons() {
  //remove any info in the button
  $("#clickBtn").empty();
  //remove existing search resutls
  $("#table > tbody").empty();
  //remove search table background css
  $(".mainsection").removeClass("section")

  // Looping through the array
  for (var i = 0; i < options.length; i++) {

    // Dynamicaly generating buttons for each options in the array
    var btn = $("<button>");
    btn.addClass("btn btn-primary button");
  
    // Adding a data-attribute
    btn.attr("data-name", options[i]);

    // Providing the initial button text
    btn.text(options[i]);

    // Adding the button to the buttons-view div
    $("#clickBtn").append(btn);
  }
}

//display search ajax info to table
function displayInfo(){  
  event.preventDefault();

  //console.log($(this).attr("data-name"));

  //grab input from button clicked
  ButtonValue = $(this).attr("data-name")
  
  //console.log(ButtonValue)
  
  var ButtonValueClick = ButtonValue.innerHTML;

  // console.log(ButtonValueClick)

  $("#clickBtn").empty();

  // Dynamicaly generating buttons for each options in the array
  var button = $("<button>");

  button.addClass("btn btn-primary Back ");
  
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
      //console.log("Success got data", response);
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

//display search ajax info to table
function renderResults(data) {
  console.log("Success got data", data);

  var IdResults = data.response.venue

  if(typeof(IdResults.hours)=="undefined"){
  
      var BusinessHours = "None"
  }else{
      //console.log(IdResults.hours.status)
      var BusinessHours = IdResults.hours.status
  }
    // console.log(IdResults.name)
    // console.log(IdResults.location.address)
    // console.log(IdResults.shortUrl)
    // console.log(BusinessHours)
    
  var BusinessName = IdResults.name
  var BusinessAddress = IdResults.location.address
  var WebsiteUrl = IdResults.shortUrl
  
  
  
  $("#table > tbody").append("<div> <tr> <td>" + BusinessName + "</td> </tr>" 
+ "<tr> <td>" + "<br>"+ BusinessAddress+ "</td> </tr>" 
+ "<tr> <td> <br> <a href='" + WebsiteUrl +"'>Website</a></td> </tr><br>" 
+ "<tr> <td>" + BusinessHours + "</td> </tr><br>"
+ "<tr> <td> <img src='assets/images/Location.JPG' alt='Map Location' height='auto' width='250px'> </td> </tr> </div><br>")
}

//
  function SearchWeb(search){

    var SearchButton = search;
    console.log(search)
    
    //TODO - add limit search to 3? 4? 

    var queryURL = "https://api.foursquare.com/v2/venues/search?ll="+lati+","+long+"&query="+SearchButton+"&radius=4000&limit=3&client_id=5MSXZF21SC1HYLZTM2TNULYNLXU3SZ3L5OY5PPKONAZQJNNW&client_secret=PWA55PPGLPWVB2F34AWNYT4YX4TNQS0JRN0Y2H0Q4WPCNQTZ&v=20180623";

    //ajax call for search term venue
    $.ajax({
        url: queryURL,
        // params: params,
        method: "GET",
        async: false
      }).then(function(response) {
        //console.log("Success got data", response);

        var results = response.response.venues
        //console.log(results)
    
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

 // Calling the renderButtons function to display the intial buttons
renderButtons();

//User Input to render a new buttoon
$("#addCategory").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var input = $("input").val().trim();
  //console.log(input)

  //Adding option from the textbox to our array
  options.push(input);

  database.ref("/test/").push({
      input: input,
  })
  // Calling renderButtons
  renderButtons();
});

//onclick of button , call the new page and display search
$(document).on("click", ".button", displayInfo);

//on click of back button, call the previous buttons
$(document).on("click", ".Back", renderButtons);


//added code for browser location search 
objloc = {
  crd:'',
  crdLAT:'',
  crdLON:'',


  options: {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  },
            
  success: function(pos) {
    crd = pos.coords;
    crdLAT = JSON.stringify(pos.coords.latitude); // figure out how to make it into a 
    crdLON = JSON.stringify(pos.coords.longitude);

    console.log(crdLAT);
    console.log(crdLON);
  },
                
            ///////////- display Map below from <here> 


  addMarkersToMap: function(map) {
      var parisMarker = new H.map.Marker({lat:crdLAT, lng:crdLON});
      map.addObject(parisMarker);
  },

      /**
      * Boilerplate map initialization code starts below:
      */

  //Step 1: initialize communication with the platform
  platform: new H.service.Platform({
      'app_id': 'j8gBhCrmT3sv7tY3U6vC',
      'app_code': '0S8xAs21neMFSH8k71Va0A',
    useCIT: true,
    useHTTPS: true
  }),

  pixelRatio: window.devicePixelRatio || 1,

  defaultLayers: objloc.platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
  }),

  //Step 2: initialize a map - this map is centered over Europe
  map:new H.Map(document.getElementById('map'),
    defaultLayers.normal.map,{
    center: {lat:crdLAT, lng:crdLON},
    zoom: 8,
    pixelRatio: pixelRatio
  }),

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  behavior: new H.mapevents.Behavior(new H.mapevents.MapEvents(map)),

  // Create the default UI components
  ui: H.ui.UI.createDefault(map, defaultLayers),
            
  error: function(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  },

};
   
// Now use the map as required...
objloc.addMarkersToMap(map);

navigator.geolocation.getCurrentPosition(objloc.success, objloc.error, objloc.options);


console.log(objloc.crdLAT);
console.log(objloc.crdLON);