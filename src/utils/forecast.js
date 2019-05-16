const request = require('request')

//? I GOAL: Add new data to forecast
    //? 1. Update the forecast string to include new data
    //? 2. Commit ur changes
    //? 3. Push ur changes to GitHub and deploy to Heroku
    //? 4. Test ur work in the live app 

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/cb97aeed68ba67e07ed049179d995616/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Nemoguce ostvariti konekciju sa weather servisom!', undefined)
        } else if ( body.error) {
            callback('Nemoguce pronaci lokaciju!', undefined)
        } else {
            callback(undefined, 
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature}℃ out. 
                There is a ${body.currently.precipProbability}% chance of rain.
                 For girl hair info, humidity is ${body.currently.humidity}%.
                 Maximum temperature ${body.daily.data[0].temperatureMax}℃ and the minimun ${body.daily.data[0].temperatureMin}℃.
                 Wind speed is ${body.currently.windSpeed}kph.
                 Visibility is ${body.currently.visibility}km.
                 Pressure ${body.currently.pressure}hPa`);
        }
    })
}

module.exports = forecast