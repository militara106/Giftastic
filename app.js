$(document).ready(function () {

    // Set initial tags
    var buttons = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup pig', 'serval', 'manbearpig'];

    // Create New Tag on submit
    $("#submit").on("click", function () {
        event.preventDefault();
        var input = $("#input").val().trim();
        console.log("User Input: " + input);

        if (buttons.includes(input) == false && input != '') {
            // Create new tag button
            input = input.toLowerCase();
            var button = $("<button>");
            button.text(input);
            button.attr("data-animal", input);
            $("#button-container").append(button);
            buttons.push(input);
            console.log("button created for " + input);
        }

        // Empty form
        $("#input").val('');
    });

    // Click Tag Button
    $("#button-container").on("click", 'button', function () {

        //API key
        var key = "QLPRNUPvimJ8IElJtlEdGsKdheyaZdQM";

        //Tag
        var tag = $(this).attr("data-animal");

        //QueryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=" + key + "&limit=10";
        console.log(queryURL);

        //API
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    // Create new objects
                    var newDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    var image = $("<img>");

                    // Set image attributes
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("class", "gif");
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");

                    // Style div
                    newDiv.css("display", "inline-block");
                    newDiv.css("padding", "1rem");

                    // Append items to div and div to container
                    newDiv.append(image);
                    newDiv.append(p);
                    $("#gif-container").prepend(newDiv);
                    console.log("Gif created");
                }
            });


    });

    // Function to pause and play gif
    $("#gif-container").on("click", ".gif", function () {
        var dataState = $(this).attr("data-state");
        var dataAnimate = $(this).attr("data-animate");
        var dataStill = $(this).attr("data-still");

        if (dataState == "still") {
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");
            console.log("Gif play");
        } else {
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");
            console.log("GIf pause");
        }

    });


});