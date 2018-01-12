const moment = require('moment');

export function weatherApi(launchData, render) {
	console.log(launchData);
    var apiKey = require('./../../.env').apiKey;
	for (var key in launchData) {
		if (launchData.hasOwnProperty(key)) {
			let launchDate = launchData[key].date;
			let dateString = moment(launchDate).format("YYYYMMDD");

			let xhr = $.get(`http://api.wunderground.com/api/${apiKey}/history_${dateString}/q/OR/Portland.json`); //97f24b4f89d53970
			xhr.done(function(response) {
				launchData[key].temperature = response.history.dailysummary[0].meantempi;
				// temperature.push(response.history.dailysummary[0].meantempi);

			});
		}
	}
    render(launchData);
}
