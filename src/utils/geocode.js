const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmlyZXNtYXJ0YSIsImEiOiJjanY5bmVpaGcxM2IzM3lxcHg2eTVnNXFkIn0.sgI0ejJCgxnNUA3W1Gs8Aw&limit=1`;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Nije moguce konektovati se na location servis!', undefined) //* prvi argument je error, tj poruka o gresci, a drugi logicno nemamo pa cemo staviti za njega undefined
        } else if (body.features.length === 0) {
            callback('Nije moguce pronaci lokaciju. Pokusajte sa drugom.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode