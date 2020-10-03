const i2c = require('i2c-bus')
const oledi2c = require('oled-i2c-bus')
const font = require('oled-font-5x7')

const i2cBus = i2c.openSync(1)

const opts = {
  width: 128,
  height: 32,
  address: 0x3c,
}

module.exports = new oledi2c(i2cBus, opts)
