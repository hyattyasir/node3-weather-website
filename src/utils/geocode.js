const request = require('request')
const geocode = (address, callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHlhdHR5YXNpciIsImEiOiJja3U5bTJuN2cwODQ5MzFtbzlkMTc2emE1In0.GWTwST0zvnPuCPLpsztJ_Q&limit=1'
    
    request({url: url, json:true},(error, response)=>{
    if (error) {
      callback('unable to connect to location service',undefined)
    }else if (response.body.features.length === 0){
      callback('Unable to find location, try another search', undefined)      
    }else {
      callback(undefined,{
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
        location:response.body.features[0].place_name
  
      })
    }
    })
  
  }
  module.exports = geocode