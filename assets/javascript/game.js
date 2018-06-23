 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDf2FIuyY6UKCUuCpihnYA-1OSWKSEe9jY",
    authDomain: "groupproject1-955fc.firebaseapp.com",
    databaseURL: "https://groupproject1-955fc.firebaseio.com",
    projectId: "groupproject1-955fc",
    storageBucket: "groupproject1-955fc.appspot.com",
    messagingSenderId: "1029016705388"
  };
  firebase.initializeApp(config);

//ajax request for event search
function displayEventInfo() {

    var animal = $(this).attr("data-name");
    //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=uCLeg25EeeHs21O7Ch1AZ99lwrT9czak&limit=10");
  
    var xhr = $.get("http://eventful.com/oauth/authorize?oauth_token=jHN2HGKDVRHbwN3q"

    
      console.log("Success got data", xhr);