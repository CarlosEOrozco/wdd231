// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// OpenWeatherMap API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74867366887913&lon=6.6437962237126165&units=metric&appid=9434f91e5c456520308c783483dcb6a3';

// Fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Test
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display the weather data
function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`; // display the current temperature
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // build the icon URL
    let desc = data.weather.map(w => capitalize(w.description)).join(", "); // get the weather descriptions

    // Update the weather icon and description
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

// Capitalize each word in the weather description
function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Call the API on page load
apiFetch();
