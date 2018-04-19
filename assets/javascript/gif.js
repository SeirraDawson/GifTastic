$(document).ready(function() {

    //Create an array of strings -> var topics [].
    var topics = ["Issa Rae", "Rugrats", "Pinky and the Brain"];

    //Function to display the topic name from the data-attribute (data-topic)
    function displayTopicName () {

        var name = $(this).attr("data-topic");
        console.log("Topic name is: " + name);
        //Call GIPHY API in JavaScript with jQuery -> var queryURL - limit of 10 images
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name +
        "&api_key=Z6aJDTddb8YIRpgF6PmSR5cGXHAYSRPs&limit=10";
        console.log("URL is: " + queryURL);

        //AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            methond: "GET"
        })
            //After data comes back from the API request
            .then(function(response){

            console.log("Response is: " + response);

            //variable to store an array of results
            var results = response.data;
            console.log("Results is: " + results);

            //loop through every result item
            for (var i = 0; i < results.length; i++){
            //Create a var for the <div> to hold the topic
            var topicDiv = $("<div>");
            topicDiv.addClass("gifContainer")

            //Create a var to store the rating data
            var rating = results[i].rating;
            //Create a an element to have the rating displayed in a <p>
            var displayRating = $("<p>").text("Rating: " + rating);
            //Append the rating
            topicDiv.append(displayRating);

            //Create variable for still images
            var stillImg = results[i].images.fixed_height_still.url;
            var animatedImg = results[i].images.fixed_height.url;
            //Create a variable to display <img>
            var topicImg = $("<img>");
            //add .attr && .addClass to images
            topicImg.attr("src", stillImg);
            topicImg.addClass("gif");
            topicImg.attr("data-state", "still");
            topicImg.attr("data-still", stillImg);
            topicImg.attr("data-animate", animatedImg);

            //Append the image
            topicDiv.append(topicImg);

            //Load new topics above the previous topics
            $("#gifArea").prepend(topicDiv);
            }
        });
    }

    //Function with a FOR loop to append a new button for each new string in the topic [].
    function newBtn (){
        //We used .empty(); to delete the topic buttons prior to adding a new topic button
        $("#topBtns").empty();

        for (var i = 0; i < topics.length; i++){
            //jQuery will create button element
            var a = $("<button class='btn-toolbar btn btn-primary'>");
            console.log("a is: " + a);
            //adding a class to the button element
            a.addClass("topic");
            //adding a data-attribute with a value of the topic at index i.
            a.attr("data-topic", topics[i]);
            //providing the button's text with a value of the topic at index i.
            a.text(topics[i]);
            //adding the button to the HTML through .append
            $("#topBtns").append(a);
        }
    }

    //on.("click") submit a new button is created
    $("#submitBtn").on("click", function(event){

        //event.preventDefault() prevents the from from submit itself.
        event.preventDefault();

        //get text from input box, trims and pushes to topic array
        var topic = $("#text-box").val().trim();
        console.log("topic is: " + topic);
        //add topic from text-box to topic []
        topics.push(topic);
        //display button
        $("#text-box").val("");
        //newBtn handles the processing of our topic array. Call the function.
        newBtn();
    });

    function stopPlayGif(){
        var state = $(this).attr("data-state");
        console.log("This is state: " + state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

        //call newBtn to display the initial list of topics
        newBtn();

        //Function for displaying the topic info
        $(document).on("click", ".topic", displayTopicName);

        //Function to stop and play gif when clicked
        $(document).on("click", ".gif", stopPlayGif);

    })

//1. Register for GIPHY API Key -> api_key=Z6aJDTddb8YIRpgF6PmSR5cGXHAYSRPs
//2. Create all files and folders for homework
//3. In HTML link the files(relative path), Bootstrap, jQuery, Google Fonts, etc.
    //3a. Create area for topicBtn area, gifArea (including rating), and form for searching.
//4. JavaScript - $(document).ready function(){}
    //a. Create an array of strings -> var topics [].
    //b. Use a LOOP to append a new button for each new string in the topic [].
    //c. Call GIPHY API in JavaScript with jQuery -> var queryURL
    //d. console.log(queryURL);
    //e. Add functionality to buttons so on.("click") 10 static,
    //   non-animated gif images from the GIPHY API.
    //f. display the rating with each gif image.
    //g. on.("click") of still gif image, the gif animate.
    //h. on.("click") a second time, the gif returns to still.
//5. Create a form to the HTML that takes the value from a the input box
    // adds it into the topic [] which adds a new button.
    //a. Create a function that makes each topic in the array into a button
    //b. In HTML -> use <input> not <button> for submit -> user can hit enter instead of having to click submit
