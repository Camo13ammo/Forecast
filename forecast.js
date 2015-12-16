var https = require("https");

//Print out an error
function printError(error){
	console.error(error.message);
}

function getWeather(lat, lng, address){
	var weatherRequest = https.get('https://api.forecast.io/forecast/71b211af6af5b9b95a1d7e62fa99d6ae/' + lat + ',' + lng, function(response){
		var body = "";
		response.on("data",function(chunk){
			body += chunk;
		});
		response.on('end',function(){
			var profile = JSON.parse(body);
			console.log("The weather today, " + Date().slice(0,15) + ", in, "  + address + " will be " + profile.daily.data[0].summary.toLowerCase() + "\n" +
			"Today's high will be " + Math.round(profile.daily.data[0].temperatureMax).toString() + "\u00b0F\n" +
			"Today's low will be " + Math.round(profile.daily.data[0].temperatureMin).toString() + "\u00b0F\n" +
			"There will be a " + 100*profile.daily.data[0].precipProbability + "% chance of precipitation.");
		});
	});
}

var geoRequest = https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + process.argv[2], function(response){
	var body = "";
	response.on("data",function(chunk){
		body += chunk;
	});
	response.on('end',function(){
			var profile = JSON.parse(body);
			try{
			var lng = profile.results[0].geometry.location.lng.toString();
			var lat = profile.results[0].geometry.location.lat.toString();
			var address = profile.results[0].formatted_address;
			getWeather(lat, lng, address);
			}
			catch(error){
				console.log("The zip code supplied is not valid.");
			}
	});
});

