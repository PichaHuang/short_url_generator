// setup mongoose connecting mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/short_url_generator')

// 取得url.js
const Url = require('../url')

// 取得連線狀態：設定 db
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Url.create({
    originalUrl: 'https://www.google.com',
    randomIndex: 'ABCDE',
    shortenUrl: 'http://localhost:3000/ABCDE'
  })
    .then(() => {
      console.log('create done.')
      db.close()
    })
    .catch((error) => console.log(error))


})

