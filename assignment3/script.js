async function getWeather() {

    let city = document.getElementById("city").value;

    if (city == "") {
        document.getElementById("weather").innerHTML =
            "Please enter a city";
        return;
    }

    try {

        let location = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" + city
        );

        let locationData = await location.json();

        if (!locationData.results) {
            document.getElementById("weather").innerHTML =
                "City not found";
            return;
        }

        let latitude = locationData.results[0].latitude;
        let longitude = locationData.results[0].longitude;

        let response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + latitude
            + "&longitude="
            + longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        let data = await response.json();

        document.getElementById("weather").innerHTML =
            "<h2>" + city + "</h2>" +
            "<p>Temperature: " + data.current.temperature_2m + " °C</p>" +
            "<p>Humidity: " + data.current.relative_humidity_2m + " %</p>" +
            "<p>Wind Speed: " + data.current.wind_speed_10m + " km/h</p>";

    } catch (error) {

        document.getElementById("weather").innerHTML =
            "Something went wrong";

    }
}