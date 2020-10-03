const font = require('oled-font-5x7')

const pad = n => (n < 10 ? `0${String(n)}` : String(n))
const ymdhis = dt => {
  const hour = pad(dt.getHours())
  const min = pad(dt.getMinutes())
  const sec = pad(dt.getSeconds())
  const year = dt.getFullYear()
  const month = pad(dt.getMonth() + 1)
  const day = pad(dt.getDate())
  return {
    ymd: `${year}-${month}-${day}`,
    his: `${hour}:${min}:${sec}`,
  }
}

const draw = (oled, { width, height }) => {
  const dt = new Date()
  const { ymd, his } = ymdhis(dt)
  oled.setCursor(0, 0)
  oled.writeString(font, 1, ymd, 1, true)
  oled.setCursor(15, 0)
  oled.writeString(font, 1, his, 1, true)
  oled.drawLine(30, height / 2, width - 30, height / 2, 1)
}

module.exports = draw
