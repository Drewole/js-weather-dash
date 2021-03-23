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

//From BCS assistant
// function buildCity(city) {
// 	//do basically everything you're doing in your for loop here
// }

// function makeCityList(ar) {
// 	for (i = 0; i < searchItems.length; i++) {
// 		buildCity(searchItems[i]
//      }
// }
// You're basically moving everything that actually adds the li into a separate function that just builds a single li
// 10: 21
// Then anywhere you need to create the li(in your existing for loop and event listeners), you call that function


// searchButton.on("click", function (event) {
// 	// searchItems.push(searchInput.val())
// 	buildCity(searchInput.val());
// 	searchInput.val("");
// });

// function buildCity(city) {
	
// }

// Go through our time array and put it on the page plz
function makeCityList() {
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
	// fetch request gets a list of all the repos for the node.js organization

	// API url from openweather api.openweathermap.org/data/2.5/forecast?q={city name}&appid=3253fb7b8c398a925dd53915f3526822
	
	let cityGeocodeUrl = `http://api.positionstack.com/v1/forward?access_key=cbfda538c5445110ea0ae5fb6a27ebb4&query=${citySearch}&limit=1`

	
	fetch(cityGeocodeUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data)
			let cityTitle = $(".city-title");
			cityTitle.text(data.data[0].name);
			// <h2>Atlanta (8/15/2019) CloudIcon</h2>
			let lat = data.data[0].latitude;
			let lon = data.data[0].longitude;

			let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=3253fb7b8c398a925dd53915f3526822`;
			// let weatherRequestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=44.96313&lon=-93.266563&units=imperial&exclude=current,minutely,hourly,alerts&appid=3253fb7b8c398a925dd53915f3526822`;

			
			fetch(weatherRequestUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data)
					cityTitle.append(`<img src='http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png' alt='${data.daily[0].weather[0].description}'/>`)
					let uv;
					if (data.daily[0].uvi <= 4) {
						uv = "low";
					} else if (data.daily[0].uvi > 4) {
						uv = "medium";
					} else {
						uv = "high";
					} 
					
					let today = `
							<ul class="summary">
								<li><span>Temperature:</span> ${data.daily[0].temp.day}°F</li>
								<li><span>Humidity:</span> ${data.daily[0].humidity}%</li>
								<li><span>Wind Speed:</span> ${data.daily[0].wind_speed} MPH</li>
								<li><span>UV Index:</span> <span class="uv ${uv}">${data.daily[0].uvi}</span></li>
							</ul>
							`
					todayContainer.append(today)

					for (i = 1; i < 6; i++) {
			let fiveDayTemplate = `
					<li class="card">
						<h3>8/16/2021</h3>
						<img src='http://openweathermap.org/img/wn/${data.daily[i].weather[i].icon}.png' alt='${data.daily[i].weather[i].description}'/>
						<span class="temp">Temp: ${data.daily[0].temp.day}°F</span>
						<span class="humidity">Humidity: ${data.daily[0].humidity}%</span>
					</li>
		
						`;
					}
		
					// Down here we put all the stuff where it will build the sections we want
					//TODO: This is the url for the icons, codes are in the response. http://openweathermap.org/img/wn/11n@2x.png

				});
		});
	}
		

// getWeatherData("minneapolis");
