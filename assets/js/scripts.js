/* 
User Story

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
const fiveDayContainer = $(".forecast");
const todayContainer = $(".today-items");
const citiesListEl = $(".cities");

// var searchItems = ["Chicago","Minneapolis","New York", "Charlotte", "Tampa"];
var searchItems = [];



// Go through our time array and put it on the page
function makeCityList() {
	citiesListEl.empty();
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
		getWeatherData(searchInput.val())
		searchItems.push(searchInput.val())
		makeCityList();
		searchInput.val("");
	}
});


//Have a Event Delegation function for the cities list
// Lets also figure out how to add the ability to hit enter to update the score 
searchButton.on("click",  function(event){
	getWeatherData(searchInput.val())
	searchItems.push(searchInput.val())
	makeCityList();
	searchInput.val("");
});




function getWeatherData(citySearch) {

	//Lets get the coords of the city the user searches
	let cityGeocodeUrl = `http://api.positionstack.com/v1/forward?access_key=cbfda538c5445110ea0ae5fb6a27ebb4&query=${citySearch}&limit=1`

	fetch(cityGeocodeUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			let cityTitle = $(".city-title");
			cityTitle.empty();
			cityTitle.text(data.data[0].name);
			let lat = data.data[0].latitude;
			let lon = data.data[0].longitude;

			//Lets get the weather information with our coordinates now
			let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=3253fb7b8c398a925dd53915f3526822`;

			fetch(weatherRequestUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);
					cityTitle.append(`<img src='http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png' alt='${data.daily[0].weather[0].description}'/>`)
					let uv;
					if (data.current.uvi <= 4) {
						uv = "low";
					} else if (data.current.uvi > 4 && data.current.uvi < 9 ) {
						uv = "medium";
					} else {
						uv = "high";
					}
					//Create the template
					let today = `
							<ul class="summary">
								<li><span>Temperature:</span> ${data.current.temp}°F</li>
								<li><span>Humidity:</span> ${data.current.humidity}%</li>
								<li><span>Wind Speed:</span> ${data.current.wind_speed} MPH</li>
								<li><span>UV Index:</span> <span class="uv ${uv}">${data.current.uvi}</span></li>
							</ul>
							`
					console.log(today)
					todayContainer.empty();
					todayContainer.append(today)

					fiveDayContainer.empty();
					for (i = 1; i < 6; i++) {
						var dateConverted = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
						let fiveDayTemplate = `
							
							<h3>${dateConverted}</h3>
							<img src='http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png' alt='${data.daily[i].weather[0].description}'/>
							<span class="temp">Temp: ${data.daily[i].temp.day}°F</span>
							<span class="humidity">Humidity: ${data.daily[i].humidity}%</span>
							`;

						let fiveDayItem = $("<li>").html(fiveDayTemplate).addClass("card");
						
						fiveDayContainer.append(fiveDayItem);
					}
				});
		});
	}
		

// getWeatherData("minneapolis");
