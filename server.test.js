const http = require('http')
const EventEmitter = require('events')
const server = require('./server')


/*
const { callback, server } = require('./server')
callback(text => console.log)

use https://www.tutorialsteacher.com/nodejs/nodejs-eventemitter ?
*/
server((text) => {
  console.log('callback',text)
})

const defaultOptions = {
  hostname: 'localhost',
  port: 3142,
  path: '/',
  method: 'POST',
}

// plain post
const reqPlain = http.request(defaultOptions, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
})
reqPlain.on('error', (error) => {
  console.error(error)
})

reqPlain.write('message=plain+post+message')
reqPlain.end()

// json post
const jsonPayload = JSON.stringify({ message: 'json message' })
const reqJson = http.request({
  ...defaultOptions,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': jsonPayload.length,
  }
}, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
})
reqJson.on('error', (error) => {
  console.error(error)
})

reqJson.write(jsonPayload)
reqJson.end()
