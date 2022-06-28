const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000;

//path to the folders we created
const publicStaticDirPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');


// telling express server about the location or directories

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));



// main page request and response
app.get('', (req,res) => {
    res.render('index',{
        title: "Weather App"
    })
})

// API
app.get('/weather', (req,res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must have to enter the address in search bar"
        })
    }

    weatherData(address , (error, {temperature, description, cityName} = {}) => {
       if(error){
        return res.send({
            error
        })
       }
       console.log(temperature, description, cityName);
       res.send({
            temperature,
            description,
            cityName
       })
    })
})

// Page not found
app.get('*', (req,res) => {
    res.render('404',{
        title:"Page not found"
    })
})

app.listen(port , () => {
    console.log("Server in up and running in port: ", port);
})