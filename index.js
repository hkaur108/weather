const express = require('express');
const request = require('request');
let apiKey="c0f9c3aa1d7f4b933f0a71a9057f43fe";
const app= express();
const port=5000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    res.render("index")
})

app.post('/', (req,res)=>{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
    if(err){
    res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
    let weather = JSON.parse(body)
    if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
    }
    }
});
})
app.listen(port, ()=>{
    console.log(`Server Connected at port ${port}`)
})