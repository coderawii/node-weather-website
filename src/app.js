const path = require('path') // ne treba instalacija, core node module
const express = require('express') // treba instalacija
const hbs = require('hbs') // treba instalacija
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//* Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//* Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//* Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        naslov: 'Weather',
        opis: 'DYNAMIC with hbs tj. {{naslov}}',
        ime: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        naslov: 'About me',
        ime: 'Marta Bires'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        naslov: 'Help',
        ime: "Dragana Marinkovic",
        opis: 'Ovo mozemo zahvaljujuci hbs-u. Help dynamic page with hbs, res.render()'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Nema pronadjene adrese. Pokusate neku drugu adresu'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { 

            if (error) { 
                return res.send({ error: error })
            } 

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error: error });
                }

                res.send({
                    prognoza: forecastData,
                    lokacija: location,
                    adresa: req.query.address
                })
            })
        })
    }

})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        naslov: '404',
        ime: 'No Help',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { 
    res.render('404', {
        naslov: '404',
        ime: 'Love',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
}) 
