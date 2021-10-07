const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=392ab4a7483e76c74f481abb1e65fc0d&query='+ latitude + ',' + longitude
    //const url = 'http://api.weatherstack.com/current?access_key=392ab4a7483e76c74f481abb1e65fc0d&query='+ latitude + ',' + longitude
     request({url:url, json:true},(error, response)=>{
       if (error){
         callback('Unable to connect to weather service', undefined)      
       }else if (response.body.error){         
           callback(response.body.error.info, undefined)
       }else {
          callback(undefined, {
            description:response.body.current.weather_descriptions[0],
            temperature:response.body.current.temperature,
            feelslike:response.body.current.feelslike
         })
       }
     })
   }

   module.exports = forecast