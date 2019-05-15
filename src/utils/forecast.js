const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/cb97aeed68ba67e07ed049179d995616/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Nemoguce ostvariti konekciju sa weather servisom!', undefined)
        } else if ( body.error) {
            callback('Nemoguce pronaci lokaciju!', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast