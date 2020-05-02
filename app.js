const Oled = require('./oled')
const startup = require('./startup')
const clock = require('./lib/clock')

const oled = new Oled()

const light = clock(() => {
  oled.clear()
  oled.switch(false)
})

let exceptionOccured = false
process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err)
    exceptionOccured = true
    process.exit()
})

process.on('exit', code => {
    light.stop()
    if (exceptionOccured) console.log('Exception occured')
    else console.log('Kill signal received')
});

light.start()

oled.switch(true)
oled.clear()

startup(oled)
