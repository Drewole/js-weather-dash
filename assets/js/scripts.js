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

var searchItems = ["Chicago","Minneapolis","New York", "Charlotte", "Tampa"];






// Go through our time array and put it on the page plz
function makeCityList(arr) {

	for (i = 0; i < arr.length; i++) {

		//This will be our HTML
		let liTemplate = `
			<li>
                         ${arr[i]}
                        <span class="material-icons">
                              delete
                        </span>
			</li>
                  `;
			

		//Lets create the element, add some classes and set some attributes, then add it to the bottom of the container div
		var citySearchItem = $("<li>");
		citySearchItem.innerHTML = liTemplate;

		citiesListEl.append(liTemplate);
		console.log(liTemplate)
	}


}
makeCityList(searchItems);


//Have a Event Delegation function for the cities list