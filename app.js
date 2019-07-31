$(document).ready(function () {
    var buttons = ['dog','cat','rabbit','hamster','skunk','goldfish','bird','ferret','turtle','sugar glider','chinchilla','hedgehog','hermit crab','gerbil','pygmy goat','chicken','capybara','teacup pig','serval','manbearpig'];

    // Create New Tag
    $("#submit").on("click", function () {
        event.preventDefault();
        var input = $("#input").val().trim();
        console.log("User Input: " + input);

        if (buttons.includes(input)==false && input !='') {
            // Create new tag button
            input = input.toLowerCase();
            var button = $("<button>");
            button.text(input);
            button.attr("data-animal", input);
            $("#button-container").append(button);
            buttons.push(input);
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
                    var newDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var image = $("<img>");

                    image.attr("src", results[i].images.fixed_height.url);
                    newDiv.css("display", "inline-block");
                    newDiv.css("padding", "1rem");

                    newDiv.append(p);
                    newDiv.append(image);

                    $("#gif-container").prepend(newDiv);
                }
            });


    });

});