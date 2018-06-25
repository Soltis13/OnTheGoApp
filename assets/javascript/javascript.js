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
var options = ["Study", "Beer", "Fastfood/Coffee", "Gas"];

database.ref().push({
    study: "Study",
    beer: "Beer",
    food: "Fastfood/Coffee",
    gas: "Gas",
});

// Function to display buttons
function renderButtons() {

    $("#clickBtn").empty();

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

// User Input to render a new buttoon
// $("#add").on("click", function (event) {
//     event.preventDefault();
//     // This line grabs the input from the textbox
//     var input = $("#category").val().trim();
//     console.log(input)

//     // Adding option from the textbox to our array
//     options.push(input);

//     database.ref().push({
//         input: input,
//     })

//     // Calling renderButtons
//     renderButtons();
// });

// Calling the renderButtons function to display the intial buttons
renderButtons();