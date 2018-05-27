var topics = ["Benedict Cumberbatch", "Alan Rickman", "David Tennant", "Ewan McGregor","H. Jon Benjamin", "Daniel Radcliffe", "James Marsters", "Colin Firth"]

function getGifs(){
    $("#gifs").empty();
    var actor = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=n6RjC1tJuS2Xi02zParsv90CL6ox206t&limit=10&q="+ actor;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       console.log(response);
       var results = response.data;

       for (var i = 0; i < results.length; i++){
        var actorDiv = $("<div class='actor'>");
        var rating = results[i].rating;
        var pRating = $("<p>").text("Rating:"+ rating);
        actorDiv.append(pRating);
        var gifUrl = results[i].images.fixed_height.url;
        var gif = $("<img>").attr("src", gifUrl);
        actorDiv.append(gif);
        $("#gifs").prepend(actorDiv);
       }

      });
}



function printBtn() {
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");    
        a.addClass("button");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#actorBtn").append(a);
      }
};
$(document).ready(function(){

$("#addActor").on("click", function(event) {
    event.preventDefault();
    $("#actorBtn").empty();
    var newActor = $("#actorInput").val().trim();
    console.log(newActor);
    topics.push(newActor);
    printBtn();
})});

$(document).on("click", ".button", getGifs);

printBtn();


