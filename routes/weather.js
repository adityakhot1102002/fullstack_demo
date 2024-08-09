const express = require("express");
const fetch = require('node-fetch');
const weatherRoute = express.Router();
const apiKey = "d743c9765383ffc8de864b59fb98a373";

weatherRoute.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.js");
});

weatherRoute.get("/", async (req, res) => {
    const {cityName = '', unit = ''} = req?.body || {};
   
    
    debugger;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
    console.log('Fetching weather data from URL: ${url}');

    try {
        const response = await fetch(url);
        const responseData = await response.json();

        if(!response.ok){
            throw new Error('Error fetching weather data: ${rsponseData.message}');
        }

        const temperature = responseData.main.temp;
        const weatherDes = responseData.weather[0].description;
        const icon = responseData.weather[0].icon;
        const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        const cityName = responseData.name;

        res.json({
            temperature,
            weatherDes,
            imageURL,
            cityName
        });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).send("Error parsing weather data.");
    }
    //}).on("error", (error) => {
        //console.error("Error making request:", error);
        //res.status(500).send("Error fetching weather data.");
});
module.exports = weatherRoute;