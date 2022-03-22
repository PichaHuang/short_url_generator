// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// require body-parser here
const bodyParser = require('body-parser')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// require gererateRandom.js file
const gererateRandom = require('./generateRandom')






// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  console.log(req.body.url)
  const shortenUrl = gererateRandom(req.body.url).shortenUrl
  console.log(shortenUrl)
  res.render('shorten', { shortenUrl: shortenUrl })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})