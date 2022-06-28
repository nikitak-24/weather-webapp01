var fetchweather = '/weather';

const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');

const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

dateElement.textContent = new Date().getDate() + "  " + monthNames[new Date().getMonth()]



weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    locationElement.textContent= "Loading...";
    tempElement.textContent="";
    weatherCondition.textContent = "";
    const locationApi = fetchweather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data =>{
            if(data.error){
                locationElement.textContent= "Can't fetch the data";
                tempElement.textContent="";
                weatherCondition.textContent = "";
            }else{
                if(data.description === 'rain' || data.description === 'haze' || data.description === 'haze'){
                    weatherIcon.className = 'wi wi-day-' + data.description
                } else{
                    weatherIcon.className = 'wi wi-day-cloudy'
                }
                locationElement.textContent= data.cityName;
                tempElement.textContent= (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    })
})