const path = require ('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for express config (static)
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handle bar engine and location
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//set up  static directory
app.use(express.static(publicDirectoryPath))

app.get('',  (req, res) => {
    res.render('index',{
        title:'Weather ',
        name: 'Hayat'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title:'About Me',
        name:'hayat'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'hayat'
    })
})
app.get('/weather',(req, res) =>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an Address'
        })
    }
    geocode(req.query.address,(error,data) =>{
        if (error){            
            return res.send({
                error:'The location canot be found'                
            })
          }
           forecast(data.latitute, data.longitude, (error, forecastData) => {
            if (error){               
              return res.send({
                  error:error
              })
            }

            res.send({
                location:data.location,
                description:forecastData.description,
                WeatherDescription:forecastData.WeatherDescription,
                temperature:forecastData.temperature,
                feelsLike:forecastData.feelslike,
                latitude:data.latitude,
                longitude:data.longitude
            })
            
          })

    })    
})

app.get('*',(req, res) =>{
    res.render('404',{
        title:'404',
        name:'hayat',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000,() =>{
  console.log('server is up on port 3000')
})