// const Oled = require('./lib/oled')
const clock = require('./lib/clock')
const server = require('./lib/server')

// const oled = new Oled()
const boot = clock(() => {
  // todo: play boot sequence on oled here
  console.log('booted')
})

boot.start()
const cb = a => console.log(a)
server(cb)
