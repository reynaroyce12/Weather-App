
const express = require("express")
const https =  require("https");
const bodyParser = require("body-parser")
// const path = require("path")
require('dotenv').config()

// console.log(process.env)

const app =  express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


app.get("/", function(req,res) {
    res.render("home.ejs")
});

app.post("/",function(req, res){
    // console.log(req.body.cityName)
    const query = req.body.cityName
    const apiKey = process.env.API_KEY
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";

    https.get(url, function (response) {
        // console.log(response.statusCode)

        response.on("data", function(data) { 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description
            res.render("post.ejs",{newQuery: query, newTemp: temp})
      })
    });
})

    
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started at port 3000");
})