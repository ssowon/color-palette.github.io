function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let url = '';
  console.log(lat, lon);

  axios({
    method: "post", // 통신 방식
    url: "/weather", // 서버
    params: {
      lat: lat,
      lon: lon
    }
  })
  .then((res)=>{
    console.log(res.data)
  })


}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);