$(document).ready(function () {

    // Set initial tags
    var buttons = ['dog', 'cat', 'rabbit', 'hamster', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat', 'chicken', 'capybara', 'teacup pig', 'serval', 'manbearpig'];

        for(var i = 0; i<buttons.length; i++){
        var button = $("<button>");
        button.text(buttons[i]);
        button.attr("data-animal", buttons[i]);
        $("#button-container").append(button);
        console.log("Initial buttons created");
        }

    // Create New Tag on submit
    $("#submit").on("click", function () {
        event.preventDefault();
        console.log("User Input: " + $("#input").val().trim().toLowerCase());

        if (buttons.includes($("#input").val().trim().toLowerCase()) == false && $("#input").val().trim().toLowerCase() != '') {
            // Create new tag button
            var button = $("<button>");
            button.text($("#input").val().trim().toLowerCase());
            button.attr("data-animal", $("#input").val().trim().toLowerCase());
            $("#button-container").append(button);
            buttons.push($("#input").val().trim().toLowerCase());
            console.log("button created for " + $("#input").val().trim().toLowerCase());
        }

        // Empty form
        $("#input").val('');
    });

    // Click Tag Button
    $("#button-container").on("click", 'button', function () {

        //API key  "QLPRNUPvimJ8IElJtlEdGsKdheyaZdQM";

        //QueryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-animal") + "&api_key=" + "QLPRNUPvimJ8IElJtlEdGsKdheyaZdQM" + "&limit=10";
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
                    // var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
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
                    newDiv.append($("<p>").text("Rating: " + results[i].rating.toUpperCase()));
                    $("#gif-container").prepend(newDiv);
                    console.log("Gif created");
                }
            });


    });

    // Function to pause and play gif
    $("#gif-container").on("click", ".gif", function () {

        // If still, animate
        if ($(this).attr("data-state") == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("Gif play");
        }
        // If animate, still
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("GIf pause");
        }

    });


});