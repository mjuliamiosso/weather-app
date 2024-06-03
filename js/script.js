const apiKey = "66a514829c5d31614e9aadd6c85d6d40"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=pt_br&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else {
        var data = await response.json()
        
        //data update
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h"
    
        //img update
        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "./img/clouds.png"
            document.querySelector(".card").style.backgroundColor = "#a9d6ff"
        }else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "./img/clear.png"
            document.querySelector(".card").style.backgroundColor = "#6bb2f3"
        }else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "./img/rain.png"
            document.querySelector(".card").style.backgroundColor = "#7395b4"
        }else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "./img/drizzle.png"
            document.querySelector(".card").style.backgroundColor = "#bccddd"
        }else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "./img/mist.png"
            document.querySelector(".card").style.backgroundColor = "#83abd0"
        }
    
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }

}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchBox.value)
})