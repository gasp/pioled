const font = require('oled-font-5x7')
const host = require('../lib/host')

const writeLine = (oled, font, line, i) => {
  oled.setCursor(0, i * 8)
  oled.writeString(font, 1, line)
}

const draw = (oled, { width, height }) => {
  const { hostname, ips, username } = host
  writeLine(`${username}@${hostname}.local`, 0)
  writeLine('raspberry', 1)
  // there can be several ips
  ips.forEach((ipLine, index) => writeLine(`${ipLine.ifname} ${ipLine.address}`, 2 + index))
  if (!ips.length) writeLine('no network', 2)
}

module.exports = draw
