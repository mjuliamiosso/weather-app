const apiKey = "66a514829c5d31614e9aadd6c85d6d40"
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=pt_br&q="
const city = document.getElementById('search')
const weatherIcon = document.getElementById('weatherIcon')
const body = document.getElementsByTagName('body')[0]
const button = document.getElementById("button")
let dayPreview = document.querySelector('.day-preview')
let weekPreview = document.querySelector('.week-preview')

//CHECAR O CLIMA
async function checkWeather(){
    const response = await fetch(apiUrl + city.value + `&appid=${apiKey}`)
    //ERRO
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".right-side").style.display = "none"
        document.querySelector("#main").style.gridTemplateColumns = "1fr"
        document.querySelector(".status").style.display = "none"
        document.querySelector(".location").style.display = "none"
        body.style.backgroundImage = 'none'
    } else {
        let data = await response.json()
        document.getElementById('temp').innerHTML = Math.round(data.list[0].main.temp) + " Cº"
        document.getElementById('city').innerHTML = data.city.name
        document.getElementById('humidity').innerHTML = data.list[0].main.humidity + "% <br> <span>Umidade</span>"
        document.getElementById('wind').innerHTML = data.list[0].wind.speed + "km/h <br> <span>Vento</span>"

        //UPDATE DO ICONE DE ACORDO COM O CLIMA
        //LIMPO
        if(data.list[0].weather[0].main == "Clear"){
            weatherIcon.src = "./img/clear-day.svg"
            body.style.backgroundImage = 'url(../img/clear-background.png)'
            document.querySelector('.status').style.backgroundColor="var(--blue)"
            document.querySelector('.day-preview').style.backgroundColor="var(--blue)"
            document.querySelector('.week').style.backgroundColor="var(--blue)"
        } 
        //NUVEM
        else if (data.list[0].weather[0].main == "Clouds"){
            weatherIcon.src = "./img/cloudy.svg"
            body.style.backgroundImage = 'url(../img/cloudy-background.jpg)'
            document.querySelector('.status').style.backgroundColor="var(--grey)"
            document.querySelector('.day-preview').style.backgroundColor="var(--grey)"
            document.querySelector('.week').style.backgroundColor="var(--grey)"
        }
        //CHUVA
        else if (data.list[0].weather[0].main == "Rain"){
            weatherIcon.src = "./img/rain.svg"
            body.style.backgroundImage = 'url(../img/rainy-background.jpg)'
            document.querySelector('.status').style.backgroundColor="var(--aqua)"
            document.querySelector('.day-preview').style.backgroundColor="var(--aqua)"
            document.querySelector('.week').style.backgroundColor="var(--aqua)"
        }
        //CHUVISCO
        else if (data.list[0].weather[0].main == "Drizzle"){
            weatherIcon.src = "./img/drizzle.svg"
            body.style.backgroundImage = 'url(../img/drizzle-background.jpg)'
            document.querySelector('.status').style.backgroundColor="var(--green)"
            document.querySelector('.day-preview').style.backgroundColor="var(--green)"
            document.querySelector('.week').style.backgroundColor="var(--green)"
        }
        //NÉVOA
        else if (data.list[0].weather[0].main == "Mist"){
            weatherIcon.src = "./img/mist.svg"
            body.style.backgroundImage = 'url(../img/mist-background.jpg)'
            document.querySelector('.status').style.backgroundColor="var(--light-grey)"
            document.querySelector('.day-preview').style.backgroundColor="var(--light-grey)"
            document.querySelector('.week').style.backgroundColor="var(--light-grey)"
        }
        //NEVE
        else if (data.list[0].weather[0].main == "Snow"){
            weatherIcon.src = "./img/snow.svg"
            body.style.backgroundImage = 'url(../img/snow-background.jpg)'
            document.querySelector('.status').style.backgroundColor="var(--white)"
            document.querySelector('.day-preview').style.backgroundColor="var(--white)"
            document.querySelector('.week').style.backgroundColor="var(--white)"
        }

        //PREVISÃO DE 3 EM 3 HORAS
        dayList = ''
        for(var i = 0; i <= 4; i++){
            let hour = data.list[i].dt_txt
            const hourSlice = hour.slice(11, 16)
            dayList += ` 
                <div class="day-container">
                    <p class="day-time">${hourSlice}</p>
                    <p class="day-weather">${Math.round(data.list[i].main.temp)}ºC</p>
                </div>
            `
            dayPreview.innerHTML = dayList
        }

        //PREVISÃO DA SEMANA
        weekList = ''
        for(var i = 7; i <= 40; i += 8){
            let weekDay = data.list[i].dt_txt
            const weekDaySlice = weekDay.slice(8, 10)
            const weekMonthSlice = weekDay.slice(5, 7)
            const weekYearSlice = weekDay.slice(0, 4)
            weekList += `
                <hr>
                <div class="week-container">
                    <p class="week-day">${weekDaySlice}/${weekMonthSlice}/${weekYearSlice}</p>
                    <p class="week-weather">${Math.round(data.list[i].main.temp) + " Cº"}</p>
                </div>
            `
            weekPreview.innerHTML = weekList
        }

        document.querySelector(".right-side").style.display = "flex"
        document.querySelector(".location").style.display = "block"
        document.querySelector(".status").style.display = "grid"
        document.querySelector("#main").style.gridTemplateColumns = "1fr 1fr"
        document.querySelector(".error").style.display = "none"
    }
}