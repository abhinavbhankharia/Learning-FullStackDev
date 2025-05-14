document.addEventListener('DOMContentLoaded',() => {
  let cityInput = document.getElementById("city-input");
  let getWeatherBtn = document.getElementById("get-weather-btn");
  let weatherInfo = document.getElementById("weather-info");
  let cityNameDisplay = document.getElementById("city-name");
  let temperatureDisplay = document.getElementById("temperature");
  let errorMessage = document.getElementById("error-message");
  let descriptionDisplay = document.getElementById('description')

  const API_KEY = "62a78307b4375e8b7c81f5af0c0a7bc1"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim()
    
    if(!city) return;

    //it may throw an error
    //server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city)
      dispayWeatherData(weatherData)

    } catch (error) {
      showError()
    }

  })
  
  async function fetchWeatherData(city){
    //gets the data

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    const response = await fetch(url)

    if(!response.ok){
      throw new Error(" City not found ")
    }
    const data = await response.json()
    return data
  }


  function dispayWeatherData(data){ 
    //display data
    const {name, main ,weather} = data
    cityNameDisplay.textContent = name

    //removing gidden class

    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
    temperatureDisplay.textContent = `Temperature : ${main.temp}` 
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`; 
    
  }

  function showError(){
    weatherInfo.classList.add('hidden')
    errorMessage.classList.remove('hidden')
  }

})

