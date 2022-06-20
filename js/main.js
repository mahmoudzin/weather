"use strict"
const inputSerch = document.getElementById('location');
const errMsg = document.getElementById('errMsg');
const weatherShow = document.getElementById('weather-show');

inputSerch.addEventListener('input', function(){
    if(inputSerch.value == ''){
        errMsg.innerHTML = '';
    }else if(!validate(inputSerch.value)) {
        errMsg.innerHTML = 'please just enter letters';
    }else{
        getData(inputSerch.value)
        errMsg.innerHTML = '';
    }
})

const validate = (term)=>{
    const regExp = /^[A-Za-z]+$/
    if (regExp.test(term)){
        return true;
    }else{
        return false;
    }
}
 
const getData = async area => {
    const key = '7aeb243e93904effa9b144917221306'
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${area}&days=5&aqi=yes&alerts=yes`)
    const data = await res.json();
    if(res.ok){
        desplay(data, printDate(data.forecast.forecastday[0].date))
    }else{
        console.log('Sometheng went wrong')
    }
}
getData('cairo')
const printDate = date => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dateArr  = date.split('-');
    const day = dateArr[2];
    const d = new Date();
    return { 
        day,
        today: days[d.getDay()],
        nextDay: days[d.getDay() + 1],
        afterNext: days[d.getDay() + 2],
        monthName: monthNames[d.getMonth()]
    }
}
const desplay = (data, date) => {
    console.log(date)
    const {location, current, forecast} = data;
    const {name} = location;
    const {feelslike_c, wind_dir, wind_kph, condition} = current;
    const {forecastday} = forecast;
    const [dayOne, dayTwo, dayThree] = forecastday;
    const {today, nextDay, afterNext, monthName, day} = date;

    console.log("1: ", dayOne, '2: ', dayTwo, "3: ",dayThree)
    
    weatherShow.innerHTML = `<div class="col-lg-4">
    <div class="weather-date d-flex p-2 justify-content-between align-items-center ">
      <h4>${today}</h4>
      <span>${day} ${monthName}</span>
    </div>
    <div class="weather-deatails ps-3 py-5">
      <h4 class="mb-5">${name}</h4>
      <div class="dagree d-flex flex-wrap align-items-center">
        <div class="display-1 fw-bold me-5 align-items-center text-white">
          ${feelslike_c}<span>o</span>C
        </div>
        
        <img src=${condition.icon} class="dagree-img" alt="">
      </div>
      <span class="my-3 main-text d-block">${condition.text}</span>
      <div class="d-flex">
        <span class="me-3">
          <img src="images/icon-umberella.png" alt="">
          ${dayOne.day.daily_chance_of_rain}%
        </span>
        <span class="me-3">
          <img src="images/icon-wind.png" alt="">
          ${wind_kph}km/h
        </span>
        <span class="me-5">
          <img src="images/icon-compass.png" alt="">
          ${wind_dir}
        </span>
      </div>
    </div>
  </div>
  <div class="col-lg-4 text-center">
    <div class="medle-date text-center p-2 ">
      <h4>${nextDay}</h4>
    </div>
    <div class="weather-medle ps-3 py-5">
      <div class="dagree">
        <img src=${dayTwo.day.condition.icon} class="pb-3" alt="">
        
        <div class="fs-3 fw-bold text-white">
        ${dayTwo.day.maxtemp_c}<span>o</span>C
        </div>
      </div>
      <div class='mintemp mt-3'>
      ${dayTwo.day.mintemp_c}<span>o</span>
      </div>
      <span class="my-3 main-text d-block">${dayTwo.day.condition.text}</span>
    </div>
  </div>
  <div class="col-lg-4 text-center">
    <div class="weather-date text-center p-2">
      <h4>${afterNext}</h4>
    </div>
    <div class="weather-deatails ps-3 py-5">
      <div class="dagree">
        <img src=${dayThree.day.condition.icon} class="pb-3" alt="">
        
        <div class="fs-3 fw-bold text-white">
        ${dayThree.day.maxtemp_c}<span>o</span>C
        </div>
      </div>
      <div class='mintemp mt-3'>
      ${dayThree.day.mintemp_c}
        <span>o</span>
      </div>
      <span class="my-3 main-text d-block">${dayThree.day.condition.text}</span>
    </div>
  </div>`
}


for(let i = 0; i < 10; i++) {
  console.log(i)
}