// 產生 5 碼英數組合的亂數
function generateRandom() {
  const box = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const boxArray = box.split('')
  let randomTicket = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * boxArray.length)
    randomTicket += boxArray[index]
  }

  const result = {
    randomIndex: randomTicket,
    shortenUrl: `http://localhost:3000/${randomTicket}`,
  }

  return result
}



// export generateRandom function for other files to use
module.exports = generateRandom