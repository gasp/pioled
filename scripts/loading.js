const font = require('oled-font-5x7')
const sleep = t => new Promise(resolve => setTimeout(resolve, t * 1000))

const draw = async (oled, { width, height }) => {
  const xleft = 16
  const xright = width - 16
  oled.drawLine(xleft, 15, xright, 15, 1)
  oled.drawLine(xleft, 18, xright, 18, 1)
  oled.drawPixel([
    [xleft - 1, 16, 1],
    [xleft - 1, 17, 1],
    [xright + 1, 16, 1],
    [xright + 1, 17, 1],
  ])
  const text = 'loading'
  const xtext = 128 / 2 - Math.floor((text.length / 2) * 5)

  oled.setCursor(xtext, 25)
  oled.writeString(font, 1, 'loading', 1, true)

  await sleep(1 / 4)
  oled.fillRect(xtext, 25, xtext + text.length * 5, 25 + 7, 0)

  let score = 0
  const progress = async () => {
    const pr = Math.floor(Math.random() * 5)
    const xmin = xleft + score
    const xmax = Math.max(xleft + score + pr, xright)
    oled.drawLine(xmin, 16, xmax, 16, 1)
    oled.drawLine(xmin, 17, xmax, 17, 1)
    score = score + pr
    if (score < 100) {
      await sleep(1 / 10)
      progress()
    }
  }
}

module.exports = draw
