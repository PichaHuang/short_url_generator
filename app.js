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

// 引用設定檔
require('./config/mongoose')


// 取得 Url model
const Url = require('./models/url')
const generateRandom = require('./generateRandom')

// 引用路由器, 將 request 導入路由器
const routes = require('./routes')
app.use(routes)









// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})