// 引用設定檔
const db = require('../../config/mongoose')

// 取得 Url model
const Url = require('../url')

// 取得連線狀態：設定 db
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

