const apiKey = "66a514829c5d31614e9aadd6c85d6d40"
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt_br&q="

let city = document.getElementById('search')
let weatherIcon = document.getElementById('weatherIcon')

//CHECAR O CLIMA
async function checkWeather(){
    const response = await fetch(apiUrl + city.value + `&appid=${apiKey}`)
    if(response.status == 404){
        console.log("error 404")
    } else {
        let data = await response.json()
        document.getElementById('temp').innerHTML = Math.round(data.list[0].main.temp) + " Cº"
        document.getElementById('city').innerHTML = data.city.name
        document.getElementById('humidity').innerHTML = data.list[0].main.humidity + "% <br> <span>Umidade</span>"
        document.getElementById('wind').innerHTML = data.list[0].wind.speed + "km/h <br> <span>Vento</span>"

        //UPDATE DO ICONE DE ACORDO COM O CLIMA
        if(data.list[0].weather[0].main == "Clear"){
            weatherIcon.src = "./img/clear-day.svg"
            
        } else if (data.list[0].weather[0].main == "Clouds"){
            weatherIcon.src = "./img/cloudy.svg"
        }else if (data.list[0].weather[0].main == "Rain"){
            weatherIcon.src = "./img/rain.svg"
        }else if (data.list[0].weather[0].main == "Drizzle"){
            weatherIcon.src = "./img/drizzle.svg"
        }else if (data.list[0].weather[0].main == "Mist"){
            weatherIcon.src = "./img/mist.svg"
        }else if (data.list[0].weather[0].main == "Snow"){
            weatherIcon.src = "./img/snow.svg"
        }
    }
    

}

// const searchBox = document.querySelector(".search input")
// const searchBtn = document.querySelector(".search button")
// const weatherIcon = document.querySelector(".weather-icon")

// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

//     if(response.status == 404){
//         document.querySelector(".error").style.display = "block"
//         document.querySelector(".weather").style.display = "none"
//     }else {
//         var data = await response.json()
        
//         //data update
//         document.querySelector(".city").innerHTML = data.name
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C"
//         document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
//         document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h"
    
//         //img update
//         }else if(data.weather[0].main=="Mist"){
//             weatherIcon.src = "./img/mist.png"
//             document.querySelector(".card").style.background= "linear-gradient(140deg, rgba(131,171,208,1) 0%, rgba(202,225,255,1) 100%)"
//         }
    
//         document.querySelector(".weather").style.display = "block"
//         document.querySelector(".error").style.display = "none"
//     }

// }

// searchBtn.addEventListener("click", ()=> {
//     checkWeather(searchBox.value)
// })