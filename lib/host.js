const os = require('os')
const ifaces = os.networkInterfaces()
const hostname = os.hostname()
const { username } = os.userInfo()

const ips = []

Object.keys(ifaces).forEach(ifname => {
  let alias = 0

  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      ips.push({ ifname: `${ifname}:${alias}`, address: iface.address })
    } else {
      // this interface has only one ipv4 adress
      ips.push({ ifname, address: iface.address })
    }
    ++alias;
  });
});

module.exports = {
  ips,
  hostname,
  username,
}
