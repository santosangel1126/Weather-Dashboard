var apiKey = "2f0aa3eeabaa9f5d0f299426c008697b";
var today = moment().format('L');
var searchHistoryList =[];

//function for current weather conditions
function currentCondition(city){
    var queryURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(function(cityWeatherResponse){
        console.log(cityWeatherResponse);

        $('#weatherContent').css('display','block');
        $('#cityDetail').empty();
        //function to grab weather icon 
        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        //function used to display temp, humidity, windspeed
        var currentCity = $(`
        <h2 id='currentCity'>
            ${cityWeatherResponse.name}${today} <img src="${iconURL}" alt="${cityWeatherResponse.weather[0].description}" />
            </h2>
            <p>Temperature: ${cityWeatherResponse.main.temp}°F</p>
            <p>Humidity: ${cityWeatherResponse.main.humidity}%</p>
            <p>Wind speed: ${cityWeatherResponse.wind.speed}MPH</p>

        `);
        $('#cityDetail').append(currentCity);

        //grab UV index for current city search 
        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uniQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url: uviQueryURL,
            method: 'GET'
        }).then(function(uviResponse){
            console.log(uviResponse);

            var uvIndex = uviResponse.value;
            var uvIndexP =$(`
            <p> UV index:
            <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
            </p>
            `);
           
        })
    })
}