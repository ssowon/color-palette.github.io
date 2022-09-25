const weather = document.querySelector(".weather");
const item1 = document.querySelector(".item1");
const item1Name = document.querySelector(".item1 .color .name");
const item2 = document.querySelector(".item2");
const item2Name = document.querySelector(".item2 .color .name");

let color1, color2 = '';

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

function setColor(weather) {
  console.log(weather);
  const h1 = Math.floor(Math.random() * 360);
  const h2 = Math.floor(Math.random() * 360);
  const s1 = Math.floor(Math.random() * 100);
  const s2 = Math.floor(Math.random() * 100);
  const l1 = Math.floor(Math.random() * 100);
  const l2 = Math.floor(Math.random() * 100);

  item1.style.backgroundColor = `hsl(${h1},${s1}%,${l1}%)`;
  item2.style.backgroundColor = `hsl(${h2},${s2}%,${l2}%)`;
  color1 = hslToHex(h1,s1,l1);
  color2 = hslToHex(h2,s2,l2);
  item1Name.innerText = `${color1}`;
  item2Name.innerText = `${color2}`;
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  axios({
    method: "post", // 통신 방식
    url: "/weather", // 서버
    params: {
      lat: lat,
      lon: lon
    }
  })
  .then((res)=>{
    const weatherData = res.data.weather[0].main;
    weather.innerText = `Weather : ${weatherData}`;
    setColor(weatherData)
  })


}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
item1.addEventListener('click', (e) => {
  navigator.clipboard.writeText(color1);
  alert(color1)
});
item2.addEventListener('click', (e) => {
  navigator.clipboard.writeText(color2);
  alert(color2)
});
