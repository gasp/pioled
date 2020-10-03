const OledCanvas = require('./oled-canvas')
const loading = require('../scripts/loading')

const width = 128
const  height= 64
const canvas = new OledCanvas(true, { width, height, address: 'any' })

loading(canvas, { width, height })
