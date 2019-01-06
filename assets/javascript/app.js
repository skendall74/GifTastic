//JS Code

var teams = ["Alabama Crimson Tide", "Arkansas Razorbacks", "Auburn Tigers", "Florida Gators", "Georgia Bulldogs", "Kentucky Wildcats", "LSU Tigers", "Mississippi State Bulldogs", "Ole Mississippi Running Rebels", "South Carolina Gamecocks", "Tennessee Volunteers", "Texas A&M Aggies", "Vanderbilt Commodores",];

// creates buttons for each of these
function makeButtons(){ 
	$('#buttonsView').empty();
	for (var i = 0; i < teams.length; i++){
		// dynamically makes buttons for every teams in the array
		var a = $('<button>') 
		a.addClass('team');
		a.attr('data-name', teams[i]); 
		a.text(teams[i]); 
		$('#buttonsView').append(a);
	}
}

// handles addTeam button event
$("#addTeam").on("click", function(){
	// grabs the user team input
	var team = $("#team-input").val().trim();
	// that input is now added to the array
	teams.push(team);
	// the makeButtons function is called, which makes buttons for all my teams plus the user team
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var team = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&limit=10&api_key=nsUjmEV9qhuUcAbACjNRw3sQfib4RBOP";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var teamGif = $('<img>');
				var teamGif = $('<img>');
					teamGif.attr('src', results[i].images.fixed_height_still.url);
					// teams the rating on hover
					teamGif.attr('title', "Rating: " + results[i].rating);
					teamGif.attr('data-still', results[i].images.fixed_height_still.url);
					teamGif.attr('data-state', 'still');
					teamGif.addClass('gif');
					teamGif.attr('data-animate', results[i].images.fixed_height.url);
				gifDiv.append(teamGif)
				// gifDiv.append(p)
				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying team gifs
$(document).on("click", ".team", displayGifs);

// initially calls the makeButtons function
makeButtons();
