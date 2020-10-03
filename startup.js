const host = require('./lib/host')

const startup = (oled) => {
  const { hostname, ips, username } = host
  oled.writeLine('raspberry', 1)
  oled.writeLine(`${username}@${hostname}.local`, 0)
  // there can be several ips
  ips.forEach((ipLine, index) =>
    oled.writeLine(`${ipLine.ifname} ${ipLine.address}`, 2 + index))
  if (!ips.length)
    oled.writeLine('no network', 2)
}

module.exports = startup
