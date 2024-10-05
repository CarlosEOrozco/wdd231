// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74867366887913&lon=6.6437962237126165&units=metric&appid=9434f91e5c456520308c783483dcb6a3';

// fetch weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // test
      displayResults(data); //display function 
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

//display the results
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`; // display the current temperature
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // build the icon URL
  let desc = data.weather[0].description; // get the weather description

  //weather icon and description
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc; // update the caption with the description
}


apiFetch();