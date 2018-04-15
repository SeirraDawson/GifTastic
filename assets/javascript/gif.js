// Array of strings for topics -> cartoons
var topics = ["Rugrats", "Hey Arnold", "Boondocks", "Magic School Bus",
            "Tom and Jerry", "Pinky and the Brain", "Scooby-Doo", "Doug",
            "Inspector Gadget"];
var stillGif;
var animatedGif;

// On click function
$("button").on("click",function(){
    var x = $(this).data("search");

    // queryURL for gif API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x +
        "&api_key=Z6aJDTddb8YIRpgF6PmSR5cGXHAYSRPs&limit=10";
        console.log(queryURL);

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"})
        .then(function(response) {
        console.log(response);

    //Loop through your 10 images
    for(var i = 0; i < response.data.length; i++){

        var flowerDiv = $("<div>");
        var rating = $("<p>").text("Rating: " + response.data[i].rating);
        var flowerImg = $("<img>");
        flowerImg.attr("src", response.data[i].images.fixed_height.url);

        flowerDiv.append(rating);
        flowerDiv.append(flowerImg);
        $("#gifArea").prepend(flowerDiv);
        }
    });
})
