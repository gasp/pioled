const os = require('os')

const i2c = require('i2c-bus')
const oledi2c = require('oled-i2c-bus')
const font = require('oled-font-5x7')

const i2cBus = i2c.openSync(1)
const ifaces = os.networkInterfaces()

const opts = {
  width: 128,
  height: 32,
  address: 0x3c
}
const oled = new oledi2c(i2cBus, opts)

oled.clearDisplay()
oled.turnOnDisplay()

const ips = []
Object.keys(ifaces).forEach(ifname => {
  let alias = 0

  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      ips.push({ ifname:  `${ifname}:${alias}`, address: iface.address })
    } else {
      // this interface has only one ipv4 adress
      ips.push({ ifname, address: iface.address })
    }
    ++ alias
  })
})

ips.map((ip, i) => {
  oled.setCursor(0, i * 8)
  oled.writeString(font, 1, `${ip.ifname} ${ip.address}`)
})

if (ips.length === 0) {
  oled.setCursor(0, 0)
  oled.writeString(font, 1, `no network`)
}
