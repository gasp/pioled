const i2c = require('i2c-bus')
const oledi2c = require('oled-i2c-bus')
const font = require('oled-font-5x7')

const i2cBus = i2c.openSync(1)

class Oled {
  constructor() {
    const opts = {
    	width: 128,
    	height: 32,
    	address: 0x3c
    }
    this.screen = new oledi2c(i2cBus, opts)
  }
  clear() {
    this.screen.clearDisplay()
  }
  switch(state) {
    console.log(`oled switched ${state ? 'on' : 'off'}`)
    if (state) {
      this.screen.turnOnDisplay()
    } else {
      this.screen.turnOffDisplay()
    }
  }
  writeLine(line, i) {
    this.screen.setCursor(0, i * 8)
    this.screen.writeString(font, 1, line)
  }
  write(str) {
    this.screen.clearDisplay()
    if (str.length < 25) return this.writeLine(str, 0)
    console.log(str.match(/(?![^\n]{1,24}$)([^\n]{1,24})\s/g))
    str.match(/(?![^\n]{1,24}$)([^\n]{1,24})\s/g).map(this.writeLine)
  }
}

module.exports = Oled
