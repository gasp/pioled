const Oled = require('./oled')
const ip = require('./ip')

const oled = new Oled()

const play = async () => {
  oled.screen.turnOnDisplay()
  oled.screen.clearDisplay()

  oled.writeLine('pi@pibox.local', 0)
  oled.writeLine('raspberry', 1)
  // display ip
  oled.writeLine(ip.reduce((acc, cur) => `${cur.ifname} ${cur.address}      ${acc}`, ''), 3)
  await new Promise(resolve => setTimeout(resolve, 60 * 1000))
  
  oled.screen.turnOffDisplay()
  oled.screen.clearDisplay()
}

play()

