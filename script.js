let unitT = 'C'

const locBtn = document.querySelector('#locBtn')
const switchBtn = document.querySelector('#switch')

async function getWeather(location) {
    try {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=19ffb0353d0c04bf6651c3036ee54a9d')
        const data = await response.json() 
        const editedData = editData(data)
        loadPage(editedData)
    } catch(err) {
        handleError()
    }
}

const getLocFromInput = () => {
    const locInput = document.querySelector('#locInput')
    return locInput.value
}

const reset = () => {
    const div = document.querySelector('.message')
    div.classList.remove('show')
}

const searchLoc = () => {
    reset()
    const location = getLocFromInput()

    if (location === '') {
        alert('City required.')
    } else {
        getWeather(location)
    }
}

const tempKtoC = (tempF) => {
    return (Number(tempF) - 273.15).toFixed(1)
}

const tempKtoF = (tempF) => {
    return ((Number(tempF) - 273.15) * 9/5 + 32).toFixed(1)
}

const editData = (data) => {
    const location = data.name
    const tempF = `${tempKtoF(data.main.temp)} ºF`
    const tempC = `${tempKtoC(data.main.temp)} ºC`
    const weather = data.weather[0].main
    const humidity = data.main.humidity
    const wind = data.wind.speed
    return {'location': location, 'tempF': tempF, 'tempC': tempC,
            'weather': weather, 'wind': wind, 'humidity': humidity}
}

const loadPage = (editedData) => {
    const locationBox = document.querySelector('#location')
    const weatherBox = document.querySelector('#weather')
    const tempCBox = document.querySelector('.C')
    const tempFBox = document.querySelector('.F')
    const windBox = document.querySelector('#windValue')
    const humidityBox = document.querySelector('#humidityValue')

    locationBox.textContent = editedData.location
    weatherBox.textContent = editedData.weather
    tempCBox.textContent = editedData.tempC
    tempFBox.textContent = editedData.tempF
    if (unitT === 'C') {
        tempCBox.classList.add('active')
        tempFBox.classList.remove('active')
    } else {
        tempCBox.classList.remove('active')
        tempFBox.classList.add('active')
    }
    windBox.textContent = editedData.wind
    humidityBox.textContent = editedData.humidity
}

const handleError = () => {
    const div = document.querySelector('.message')
    div.classList.add('show')
}

const switchCF = () => {
    const tempCBox = document.querySelector('.C')
    const tempFBox = document.querySelector('.F')
    if (unitT === 'C') {
        unitT = 'F'
        switchBtn.textContent = 'to ºC'
        tempCBox.classList.remove('active')
        tempFBox.classList.add('active')
    } else {
        unitT = 'C'
        switchBtn.textContent = 'to ºF'
        tempCBox.classList.add('active')
        tempFBox.classList.remove('active')
    }
}

locBtn.addEventListener('click', () => searchLoc())
switchBtn.addEventListener('click', () => switchCF())
getWeather('London')