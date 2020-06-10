//jshint esversion:6
const express = require("express");
const axios = require("axios");
const bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apikey= process.env.API_Key;
  url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid='+apikey;
  axios.get(url)
    .then(function(response) {
      // handle success
      console.log(response.status);
      const weatherdata = response.data;
      const icon = weatherdata.weather[0].icon;
      const temp = weatherdata.main.temp;
      const description = weatherdata.weather[0].description;
      res.header('Content-Type', 'text/html');
      res.write("<h1>The weather is currently "+description+"</h1");
      res.write("<br>");
      res.write("<h1>The temperaure in "+query+" is : " + temp + " degree celcius</h1>");
      const imgurl="http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      res.write("<img src="+imgurl+">");
      res.send();
    })
    .catch(function(error) {
      // handle error
      console.log(error.response.status);
    });
});




app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
