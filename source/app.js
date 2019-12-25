const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory to serve
app.use(express.static(publicDirectoryPublic))

app.get('/index', (req, res) => {
  res.render('index', {
      title: 'Weather',
      name: 'Rachid'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About car',
    name: 'Rachid'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Rachid'
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You have to provide an address.'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {
    if (error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rachid Bouain',
    errorMessage: 'Help article not found!...try again please!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rachid Bouain',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {console.log('Actually this app is listening on port ' + port)})
  