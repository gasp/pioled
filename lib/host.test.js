const host = require('./host')

const { hostname, ips, username } = host
console.assert(hostname === 'baldr', `hostname: expected "baldr", got "${hostname}"`)
console.assert(Array.isArray(ips), 'ips: should be an array')
console.assert(typeof ips[0] === 'object', `ips: [0] should be an object`)
console.assert(
  Object.keys(ips[0]).join(',') === 'ifname,address',
  `ips: [0] should have keys ifname,address, got ${Object.keys(ips[0]).join(',')}`,
)
console.assert(username === 'gaspard', `username: expected "gaspard", got ${username}`)
