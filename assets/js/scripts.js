/* 
User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


Acceptance Criteria

GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

*/

//Lets grab the dom elements we need
const searchInput = $("#search");
const searchButton = $(".search-btn");
const fiveDayContainer = $(".forcast");
const todayContainer = $(".today");
const citiesListEl = $(".cities");

// var searchItems = ["Chicago","Minneapolis","New York", "Charlotte", "Tampa"];
var searchItems = [];



// Go through our time array and put it on the page plz
function makeCityList(ar) {
	
	for (i = 0; i < searchItems.length; i++) {

		//This will be our HTML
		let liTemplate = `
			<li>
                         ${searchItems[i]}
                        <span class="material-icons">
                              delete
                        </span>
			</li>
                  `;
			
		//Lets create the element, add some classes and set some attributes, then add it to the bottom of the container div
		var citySearchItem = $("<li>");
		citySearchItem.innerHTML = liTemplate;

		citiesListEl.append(liTemplate);
	}
}

searchInput.keypress(function (event) {
	if (event.keyCode === 13) {
		console.log("Keypress")
		console.log(searchItems)
		searchItems.push(searchInput.val())
		makeCityList();
		searchInput.val("");
	}
});


//Have a Event Delegation function for the cities list
// Lets also figure out how to add the ability to hit enter to update the score 
searchButton.on("click",  function(event){
	console.log("Click")
	console.log(searchItems)
	searchItems.push(searchInput.val())
	makeCityList();
	searchInput.val("");
});


function getWeatherData(citySearch) {
	// fetch request gets a list of all the repos for the node.js organization

	// API url from openweather api.openweathermap.org/data/2.5/forecast?q={city name}&appid=3253fb7b8c398a925dd53915f3526822
	
	let cityGeocodeUrl = `http://api.positionstack.com/v1/forward?access_key=cbfda538c5445110ea0ae5fb6a27ebb4&query=${citySearch}&limit=1`

	
	fetch(cityGeocodeUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data)
			let lat = data.data[0].latitude;
			let lon = data.data[0].longitude;

			let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=3253fb7b8c398a925dd53915f3526822`;
			// let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=44.96313&lon=-93.266563&units=imperial&exclude=current,minutely,hourly,alerts&appid=3253fb7b8c398a925dd53915f3526822`;

			
			fetch(weatherRequestUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data)

					// Down here we put all the stuff where it will build the sections we want
					//TODO: This is the url for the icons, codes are in the response. http://openweathermap.org/img/wn/11n@2x.png

				});
		});
	}
		

getWeatherData("minneapolis");
