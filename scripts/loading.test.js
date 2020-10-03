const fs = require('fs')
const OledCanvas = require('../lib/oled-canvas')
const loading = require('./loading')

const width = 128
const height = 64

const bus = (index, buffer) => {
  const filename = __dirname + `/loading-${index}.png`
  console.log(filename)
  const file = fs.createWriteStream(filename)
  buffer.pipe(file)
}

const canvas = new OledCanvas(bus, { width, height, address: 'any' })

loading(canvas, { width, height })
