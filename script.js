const apikey = "4bf9326188d743548d89f8556d701a37"
const weatherDataEl  = document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector('form');

formEl.addEventListener("submit",  (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    console.log(cityValue)
    getWeatherData(cityValue)
})

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

            
            
            if(!response.ok){
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data)
            const temprature = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            const details = [
                `${Math.round(data.main.feels_like)}`,
                `${data.main.humidity}%`,
                `${data.wind.speed}m/s`,
            ]
            const maxTemp = data.main.temp_max;
            const minTemp = data.main.temp_min;

            console.log(details[1])
            weatherDataEl.querySelector(".temprature").textContent = `${temprature}°C`;
            weatherDataEl.querySelector('.description').textContent = `${description}`;
            document.getElementById('f-val').innerHTML = details[0];
            document.getElementById('h-val').innerHTML = details[1];
            document.getElementById('w-val').innerHTML = details[2];

            document.querySelector('.weather-icon').innerHTML= `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" >`;
            document.querySelector('.max-temp-value').innerHTML = maxTemp;
            document.querySelector('.min-temp-value').innerHTML = minTemp;
            document.querySelector('.district').innerHTML = `${cityValue} ,`;
            
            
    }catch{
        console.log('error occurd');
    }
}