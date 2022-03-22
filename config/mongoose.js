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

module.exports = db