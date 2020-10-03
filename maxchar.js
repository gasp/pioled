const Oled = require('./oled')
const oled = new Oled()

oled.screen.turnOnDisplay()
oled.screen.clearDisplay()

oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 0)
oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 1)
oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 2)
oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 3)
oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 4)
oled.writeLine('0123456789ABCDEF0123456789ABCDEF', 5)

