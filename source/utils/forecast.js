const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e51ad36f9a761bcd887d4578ff8dfaff/' + latitude + ',' + longitude 

// request({ url : url, json:true}, (error, response) => {
//     if (error) {
//         callback('Unable to connect to weather serve!',undefined)
//     } else if (response.body.error) {
//         callback('Unable to find location',undefined)
//     } else {
//         callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + " degress out. " + " There is a " + response.body.currently.precipProbability + ' chance of rain.')
//     }
// })

// }

// module.exports = forecast

// Destructuring

request({ url : url, json:true}, (error, { body }) => {
    if (error) {
        callback('Unable to connect to weather serve!',undefined)
    } else if (body.error) {
        callback('Unable to find location',undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + " degress out. This high today is " + body.daily.data[0].temperatureHigh + " with a low of " + body.daily.data[0].temperatureLow + ". There is a " + body.currently.precipProbability + ' chance of rain.')
    }
})

}

module.exports = forecast

