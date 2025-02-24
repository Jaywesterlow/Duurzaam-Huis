var APIKEY = '6ee8de3e1a315894761e9006065cffde';
var latitude = 0;
var longitude = 0;
var lastResult = null;

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }

    if (callback) {
    	callback();
    }
}

function showPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;

	getJSON('https://api.forecast.io/forecast/' + APIKEY + '/' + 
		latitude + ',' + longitude + '?units=si&lang=pt&exclude=minutely,hourly,daily,alerts,flags', 
		function(result) {

	        lastResult = result;
		});
}


function getJSON(url, callback) {
	var x = new XMLHttpRequest();
	x.open('GET', url);
	x.responseType = 'json';
	x.onload = function() {
		callback(x.response);
	};
	x.send();
}

function showError(error) {
	var statusDiv = document.getElementById("status");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("Gebruiker heeft geoLocatie geweigerd.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Locatie informatie niet beschikbaar");
            break;
        case error.TIMEOUT:
            console.log("Reqeust Timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Unknown Error");
            break;
    }
}

chrome.runtime.onInstalled.addListener(function() {
	chrome.alarms.create("forecast", {
	   delayInMinutes: 1,
	   periodInMinutes: 10
	});
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
	getLocation();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "getCurrentForecast") {
		getLocation(function() {
			sendResponse(lastResult);
		});
	}
});