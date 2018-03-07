var topics = ["rowing","skiing", "hiking", "running", "slacklining", "mountain biking", "backpacking"];

      
      function displayTopicInfo() {
        $("#topics-view").empty();
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=h3TsSWxqGGDA7VjrsSI87Q1nyAskkhHM";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var c = 0; c < 10; c++) {
                var topicDiv = $("<div class='sport'>");
                var rating = response.data[c].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                topicDiv.append(pOne);
                var imgURL = response.data[c].images.fixed_width.url;
                var imgStillURL = response.data[c].images.fixed_width_still.url;
                var image = $("<img>").attr("src", imgURL);
                var imgStill = $("<img>").attr("src", imgStillURL);
                imgStill.addClass("still");
                image.addClass("gif");
                topicDiv.append(image);
                topicDiv.append(imgStill);
                $("#topics-view").prepend(topicDiv);
            };
        });

      }

      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          a.addClass("topic-btn");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
      });

      $(document).on("click", ".still", function() {
        

        
        $(this).prev().toggle(); $(this).toggle();
        //$(".gif").toggle();
    });

    $(document).on("click", ".gif", function() {
        

        
        $(this).next().toggle(); $(this).toggle();
        //$(".gif").toggle();
    });

      $(document).on("click", ".topic-btn", displayTopicInfo);

      renderButtons();