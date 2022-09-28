const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName
    const apiKey = "981fc688ea88923405cd93c3e0ffcb93"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit
    
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const tempr = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        console.log(weatherData);
        console.log(weatherDescription);
        console.log(tempr);

        res.write("<p> The weather situation is " + weatherDescription +"</p>"); 
        res.write("<h1>The tempreature in "+ query + " is " + tempr +  " degree celcius </h1>");
        res.write("<img src ="+ imgURL +">");
    })
})
});


app.listen(3000, function(){
    console.log("Server has started on port 3000");
});