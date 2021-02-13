const api = {
    
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e){
    if (e.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {return weather.json()})
        .then(displayResults);
    
}

async function displayResults (weather) {
    // console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML= `${weather.name}, ${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder (today);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>º</span>`;

    let weather_el = document.querySelector('.weather-text');
    weather_el.innerHTML = weather.weather[0].description;

    let icono = document.querySelector('#imagen');
    icono.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    let tempFeels = document.querySelector('.feels-like-deg');
    tempFeels.innerHTML = `${Math.round(weather.main.feels_like)}<span>º</span>`;

    let wind = document.querySelector('#wind');
    wind.innerHTML = `${Math.round(weather.wind.speed)} m/s`;

    let humidt = document.querySelector('#humidt');
    humidt.innerHTML = `${weather.main.humidity} %`;

    let high = document.querySelector('#high');
    high.innerHTML = `${Math.round(weather.main.temp_max)}º`;

    let low = document.querySelector('#low');
    low.innerHTML = `${Math.round(weather.main.temp_min)}º`
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let dayNum = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${dayNum} ${month}, ${year}`;
}