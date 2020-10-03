/*
 * based on clock.js
 * Display a digital clock on a small I2C connected display
 *
 * 2016-11-28 v1.0 Harald Kubota
 */


"use strict";

var i2c = require('i2c-bus'),
    i2cBus = i2c.openSync(1),
    oled = require('oled-i2c-bus');

const SIZE_X=128,
      SIZE_Y=32;

var opts = {
  width: SIZE_X,
  height: SIZE_Y,
  address: 0x3C
};

var oled = new oled(i2cBus, opts);


oled.clearDisplay();
oled.turnOnDisplay();

// oled.drawPixel([
//     [SIZE_X-1, 0, 1],
//     [SIZE_X-1, SIZE_Y-1, 1],
//     [0, SIZE_Y-1, 1],
//     [0, 0, 1]
// ]);
//
// oled.drawLine(1, 1, SIZE_X-2, 1, 1);
// oled.drawLine(SIZE_X-2, 1, SIZE_X-2, SIZE_Y-2, 1);
// oled.drawLine(SIZE_X-2, SIZE_Y-2, 1, SIZE_Y-2, 1);
// oled.drawLine(1, SIZE_Y-2, 1, 1, 1);

var font = require('oled-font-5x7');

// Clock

const pad = (n) => n < 10 ? `0${String(n)}` : String(n)
const ymdhis = (dt) => {
  const hour = pad(dt.getHours())
  const min = pad(dt.getMinutes())
  const sec = pad(dt.getSeconds())
  const year = dt.getFullYear();
  const month = pad(dt.getMonth() + 1)
  const day = pad(dt.getDate())
  return `${year}-${month}-${day}T${hour}:${min}:${sec}Z`
}

function displayClock() {
  const dt = new Date();
  // oled.invertDisplay(true)
  oled.setCursor(0, 0)
  oled.writeString(font, 1, ymdhis(dt), 1, true)
}

setInterval(displayClock, 1000);

console.log('initialized')
// oled.setCursor(10,20);
// oled.writeString(font, 1, 'hello world', true);

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
  oled.turnOffDisplay()
});

process.on('SIGINT', (code) => {
  console.log("Caught interrupt signal", code)
  oled.turnOffDisplay()
  process.exit()
})

