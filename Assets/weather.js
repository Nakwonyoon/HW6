$(document).ready(function () {

    function searchCity(input) {
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + APIKey;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            getLastData(input)
            forcastWeatehr(input)
            $("#forcast").empty();
            var name = response.name
            var temp = response.main.temp;
            var windSpeed = response.wind.speed;
            var humidity = response.main.humidity;
            var currentDate = moment.unix(response.dt).format("l");
            var currentWeatherCode = response.weather[0].icon;
            var currentWeatherUrl = "https://openweathermap.org/img/w/" + currentWeatherCode + ".png";
            var cityName = $("<h2>").text(name + "  " + currentDate);
            var imageWeather = $("<img>").attr("src", currentWeatherUrl);
            cityName.append(imageWeather);
            var cityTemp = $("<div>").text("Temperature :" + " " + temp + "°F");
            var cityWindSpeed = $("<div>").text("Wind speed :" + " " + windSpeed + "MPH");
            var cityHumidity = $("<div>").text("Humidity :" + " " + humidity + " " + " %");
            $("#cityInfo").empty();
            $("#cityInfo").append(cityName, cityTemp, cityWindSpeed, cityHumidity);
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var uvIndexQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?&appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                    url: uvIndexQueryUrl,
                    method: "GET"
                })
                .then(function (response) {
                    uvIndexValue = response.value;
                    var uvIndexEl = $("<div>").text("UV Index :");
                    var uvIndexValueEl = $("<span>").text(uvIndexValue)
                    console.log(uvIndexValueEl);
                    $("#cityInfo").append(uvIndexEl);
                    $(uvIndexEl).append(uvIndexValueEl);
                    if (uvIndexValue <= 2) {
                      uvIndexValueEl.addClass("safe")                      
                    } 
                      else if (uvIndexValue > 2 && uvIndexValue <=5) {
                        uvIndexEl.addClass("moderate")
                    } else if (uvIndexValue > 5 && uvIndexValue <=9) {
                        uvIndexValueEl.addClass("caution")
                    } else if (uvIndexValue > 9) {
                        uvIndexValueEl.addClass("severe")
                    }
                })
            })
        }
function forcastWeatehr(input) {
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var fiveDayQueryUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +input + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
        $.ajax({
                url: fiveDayQueryUrl,
                
                method: "GET"
            })
            .then(function (response) {
                var fiveDayForecast = response.list;
                for (var i = 0 ; i < 5 ; i++){
                    forcastWeatherCode = fiveDayForecast[i].weather[0].icon;
                    var forcastDate = moment.unix(fiveDayForecast[i].dt).format("l");
                    var forcastWeatehrIcon = "https://openweathermap.org/img/w/" + forcastWeatherCode + ".png";
                    var realIcon = $("<img>").attr("src", forcastWeatehrIcon);
                    var foracastTemp = fiveDayForecast[i].temp.day;
                    var forcastTempEL =$("<div>").text("Temperature :" + " " + foracastTemp); 
                    var forcastHumidity = fiveDayForecast[i].humidity;
                    var forcastHumidityEl = $("<div>").text("Humidity :" + " " + forcastHumidity);
                    var fiveCards = $("<div class = 'card text-black bg-primary mb-3 forcastCards'>");
                    $("#forcast").append(fiveCards);
                    fiveCards.append(forcastDate);
                    fiveCards.append(realIcon);
                    fiveCards.append(forcastTempEL);
                    fiveCards.append(forcastHumidityEl); 
                }
            })
        } 
    $()
    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        var input = $("#cityInput").val().trim();
        var p = $("<button>").addClass("history");
        $("#history").append(p);
        p.text(input);
        localStorage.setItem("searched-cities", JSON.stringify(input));
        searchCity(input);
        // getLastData(input)
    });
    // function getLastData(input){
    //    if (input !== null) { 
    //     localStorage.getItem("searched-cities");
    //    };
    // }
    
});
