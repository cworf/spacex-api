import {
    findLaunch
} from "./../dev/js/main-logic.js";

$(document).ready(function() {

    // FUNCTION DEFINITIONS
    function render(dataIn) {

		console.log(dataIn);
				let youtubeID = dataIn.youtubeID;
	            let flightNumber = "key";
	            let payload = dataIn.payload;
	            let temperature = dataIn.temperature;
	            let template = `<div class="item">
	      <h2>launch ${flightNumber}</h2>
	      <div class="meta"><span class="meta-title">Payload: </span>${payload}</div>
	      <div class="meta"><span class="meta-title">Temperature: </span>${temperature}</div>
	      <iframe width="560" height="315" src="//www.youtube.com/embed/${youtubeID}" frameborder="0" allowfullscreen></iframe>
	      </div>`;

	            $("#results").append(template); //output the section

    }

    // CLICK FUNCTION
    $("#submit-form").click(function(event) {
        event.preventDefault();
		$("#results").text(''); //clear the section
        // let date = Date.now();
        let filterBy = [];
        let filterValue = [];

        $('*[name=filter]').each(function() {
            if ($(this).val()) {
                filterBy.push($(this).attr('id'));
                filterValue.push($(this).val());
            }
        });
        console.log(filterValue);
        if (filterValue.length != 0) {
            findLaunch(filterBy, filterValue, render);
        } else {
            alert("pick a filter yo!");
        }

    });
});
