city.addEventListener("keyup", e => {
    e.preventDefault()
    if(e.keyCode === 13 ){
        checkWeather()
    }
})