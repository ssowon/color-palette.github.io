/*
weather code 
2xx : Thunderstorm
3xx : drizzle
5xx : rain
6xx : snow
7xx : atposphere
800 : clear
8xx : Clouds
9xx : extreme
*/

let weatherCode = 800;
const weather = document.querySelector(".weather");

const item1 = document.querySelector(".item1");
const item1Name = document.querySelector(".item1 .color .name");
const item1Copy = document.querySelector(".item1 .color .copy");
const refresh1 = document.querySelector(".refresh1");

const item2 = document.querySelector(".item2");
const item2Name = document.querySelector(".item2 .color .name");
const item2Copy = document.querySelector(".item2 .color .copy");
const refresh2 = document.querySelector(".refresh2");

let color1 = '#FF5A36';
let color2 = '#3659FF';

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function setSRange(code) {
  if(code < 300) {
    // Thunderstorm 형광
    return Math.floor(( Math.random() * (100 - 90) + 90));
  } else if(code < 500) {
    // drizzle
    return Math.floor(( Math.random() * (60 - 40) + 40));
  } else if(code < 600) {
    // rain
    return Math.floor(Math.random() * 60);
  } else if(code < 700) {
    // snow
    return Math.floor(( Math.random() * (100 - 30) + 30) );
  } else if(code <= 800) {
    // clear, atposphere
    return Math.floor(( Math.random() * (55 - 45) + 45 ) );
  } else if(code < 900) {
    // Clouds
    return Math.floor(Math.random() * 60);
  } else {
    // extreme
    return Math.floor(Math.random() * 100);
  }
}
function setLRange(code) {
  if(code < 300) {
    // Thunderstorm
    return Math.floor(( Math.random() * (60 - 50) + 50 ) );
  } else if(code < 500) {
    // drizzle
    return Math.floor(( Math.random() * (80 - 30) + 30 ) );
  } else if(code < 600) {
    // rain
    return Math.floor(Math.random() * 70);
  } else if(code < 700) {
    // snow
    return Math.floor(( Math.random() * (100 - 30) + 30) );
  } else if(code <= 800) {
    // clear, atposphere
    return Math.floor(( Math.random() * (55 - 45) + 45 ) );
  } else if(code < 900) {
    // Clouds
    return Math.floor(Math.random() * 100);
  } else {
    // extreme
    return Math.floor(Math.random() * 100);
  }
}

function setColor(num) {
  const h = Math.floor(Math.random() * 360);
  const s = setSRange(weatherCode);
  const l = setLRange(weatherCode);

  if(num == 1) {
    item1.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
    color1 = hslToHex(h,s,l);
    item1Name.innerText = `${color1}`;
  } else {
    item2.style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
    color2 = hslToHex(h,s,l);
    item2Name.innerText = `${color2}`;
  }
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  axios({
    method: "post", // 통신 방식
    url: "/weather", // 서버
    // url: "https://ssowon.github.io/color-palette.github.io/src/server.js/weather", // 서버
    params: {
      lat: lat,
      lon: lon
    }
  })
  .then((res)=>{
    const weatherData = res.data.weather[0].main;
    weatherCode = res.data.weather[0].id
    weather.innerText = `Weather : ${weatherData}`;
    setColor(1)
    setColor(2)
  })


}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

item1.style.backgroundColor = `#FF5A36`;
item2.style.backgroundColor = `#3659FF`;

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);

item1.addEventListener('click', (e) => {
  item1Copy.innerText = '✔';
  setTimeout(() => {
    item1Copy.innerText = '📋';
  }, 1000)
  navigator.clipboard.writeText(color1);
});
item2.addEventListener('click', (e) => {
  item2Copy.innerText = '✔';
  setTimeout(() => {
    item2Copy.innerText = '📋';
  }, 1000)
  navigator.clipboard.writeText(color2);
});

refresh1.addEventListener('click', (e) => {
  setColor(1)
});
refresh2.addEventListener('click', (e) => {
  setColor(2)
});
