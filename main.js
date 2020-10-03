const server = require('./server')
const Oled = require('./oled')
const ip = require('./ip')

const oled = new Oled()
server(err => console.log('err'), text => oled.write(text))

// display ip
oled.write(ip.reduce((acc, cur) => `${cur.ifname} ${cur.address}      ${acc}`, ''))
