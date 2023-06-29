const express = require("express");
const app =express();
const bodyParser = require("body-parser")
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/",function(req,res){
    const query = req.body.cityName
    const apiKey = "7c8cd10b65852f18698739a36378397a"
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey + "&units=metric"
    https.get(url,function(response){
           console.log(response.statusCode);

           response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            console.log(des);
            console.log(temp);
            res.write("<h1>The weather is currently " + des+".</h1>")
    res.write("<h2>The current temperature in "+ query + " is " + temp+" degree Celsius.</h2>")
    res.send();
           })
        })
})
app.listen(3000,function(){
    console.log("Your server is running.")
})
