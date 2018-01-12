import { weatherApi } from "./weather-logic.js";

export function findLaunch(filterBy, filterValue, render) {
    let filters = [];
    for (var i = 0; i < filterBy.length; i++) {
        let by = filterBy[i];
        let val = filterValue[i];
        filters.push(`${by}=${val}`);
    }

    filters = filters.join("&");

    const xhr = $.get(`https://api.spacexdata.com/v2/launches/?${filters}`);

    xhr.done(function(responses) {
        const dataOut = {};

        responses.forEach(function(response) {

            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = response.links.video_link.match(regExp);
			var key = response.flight_number;
            if (match && match[2].length == 11) {
				dataOut[key] = {
					payload: response.rocket.second_stage.payloads[0].payload_type,
					date: response.launch_date_local,
					youtubeID: match[2]
				};
            } else {
                console.log("FAILURE to quantify");
            }
        });
        weatherApi(dataOut, render);
        // render(myIds, flightNumbers, weather);
    });
    xhr.fail(function() {
        console.log("FAILURE to reprogram the link to lowLetter");
    });
}
