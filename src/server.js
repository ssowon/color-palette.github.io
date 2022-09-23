import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import fetch from "node-fetch";

dotenv.config();
const __dirname = path.resolve();

const API_KEY = process.env.WEATHER_API_KEY;
console.log(API_KEY);
const app = express();

console.log("hello");

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname+"/src/public"));
app.get("/", (req, res) => res.render("index.html"));
app.get("/*",(req,res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on https://localhost:3000`);
app.listen(3000, handleListen);

function getWeatherData(res, lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`


  return fetch(url)		 // 올바른 url요청을 보낸다
    .then(res => res.json()) 
    .then((result) => {
        console.log(result)
        res.json({
          city: result.name,
          temp: result.main.temp,
          weather: result.weather
        });
      })
    .catch((err) => console.log(err))    
}

app.post('/weather', (req, res)=>{
  console.log(req.query);
  const lat = req.query.lat;
  const lon = req.query.lon;

  getWeatherData(res, lat, lon);
});
