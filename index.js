const i2c = require('i2c-bus')
const oledi2c = require('oled-i2c-bus');
const font = require('oled-font-5x7');


const i2cBus = i2c.openSync(1)
const opts = {
		width: 128,
		height: 32,
		address: 0x3c
}

var oled = new oledi2c(i2cBus, opts)

oled.clearDisplay()
oled.turnOnDisplay()
oled.setCursor(10, 0)
oled.invertDisplay(false);

// oled.writeString(font, 1, 'hello maze team how are you doing? life is great')
// oled.turnOffDisplay()
//
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius neque diam, sed lacinia leo varius at. Phasellus id fringilla mi. Sed venenatis eros id iaculis scelerisque. Sed rutrum pellentesque metus scelerisque tristique. Suspendisse facilisis tellus nec ligula tincidunt luctus. Phasellus at venenatis felis, et venenatis odio. Nullam odio diam, tincidunt sit amet enim vel, dignissim ullamcorper quam.".match(/(?![^\n]{1,24}$)([^\n]{1,24})\s/g).map((line, i) => {
      oled.setCursor(0, i*8)
      oled.writeString(font, 1, line)
    })
