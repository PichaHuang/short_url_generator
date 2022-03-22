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

// setup mongoose connecting mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short_url_generator')

// 取得連線狀態：設定 db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// 取得 Url model
const Url = require('./models/url')
const generateRandom = require('./generateRandom')




// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

// 使用者按下縮網址按鈕後,進入此路由
app.post('/', (req, res) => {
  const originalUrl = req.body.url                            // 長網址 
  console.log(originalUrl)
  Url.findOne({ originalUrl })                                // 資料庫尋找是否已經有該筆資料
    .lean()
    .then((data) => {
      if (!data) {                                            // 如果資料庫找不到  
        const newData = generateRandom()                      // 執行產生亂數
        Url.create({                                          // 把新資料存入資料庫 
          originalUrl: originalUrl,
          randomIndex: newData.randomIndex,
          shortenUrl: newData.shortenUrl,
        })
        res.render('shorten', { url: newData.shortenUrl })    // 渲染 shorten 頁面並顯示縮網址

      } else {                                                // 如果資料庫有找到既有的資料
        res.render('shorten', { url: data.shortenUrl })       // 渲染 shorten 頁面並顯示縮網址
      }
    })
    .catch((err) => console.log(err))
})

// 使用者在網址列輸入短網址, 瀏覽器就會導向原本的網站
app.get('/:randomIndex', (req, res) => {
  const randomIndex = req.params.randomIndex                  // 取得網址列輸入的縮網址
  Url.findOne({ randomIndex })                                // 資料庫尋找是否已經有該筆資料
    .lean()
    .then((data) => {
      if (!data) {                                            // 如果資料庫找不到
        res.render('fail')                                    // 渲染 fail 頁面
      } else {                                                // 如果資料庫有找到既有的資料
        res.redirect(data.originalUrl)                        // 畫面導向該筆資料的長網址
      }
    })
    .catch((err) => console.log(err))
})




// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})