const fs = require('fs')
const OledCanvas = require('./oled-canvas')

const sample = (oled, { width, height }) => {
  oled.drawLine(10, 10, 30, 30, 1)
  oled.drawLine(30, 10, 10, 30, 1)
}

const bus = (index, buffer) => {
  const filename = __dirname + `/test-${index}.png`
  console.log(filename)
  const file = fs.createWriteStream(filename)
  buffer.pipe(file)
}

const width = 128
const height = 64
const canvas = new OledCanvas(bus, { width, height, address: 'any' })

sample(canvas, { width, height })
