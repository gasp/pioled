const i2c = require('i2c-bus')
const oledi2c = require('oled-i2c-bus');
const font = require('oled-font-5x7');

const sleep = t => new Promise((resolve) => setTimeout(resolve, t * 1000))


const i2cBus = i2c.openSync(1)
const opts = {
	width: 128,
	height: 32,
	address: 0x3c
}

const oled = new oledi2c(i2cBus, opts)

const screen = [
	{
		name: 'loading',
		draw: (oled) => {
			const xleft = 16
			const xright = 128 - 16
			oled.drawLine(xleft, 15, xright, 15, 1)
			oled.drawLine(xleft, 18, xright, 18, 1)
			oled.drawPixel([
				[xleft -1, 16, 1],
				[xleft -1, 17, 1],
				[xright +1, 16, 1],
				[xright +1, 17, 1],
			])
			const text = 'loading'
			const xtext = 128/2 - Math.floor(text.length / 2 * 5)
			let blinkNum = 0
			const blink = () => {
				setTimeout(() => {
					oled.setCursor(xtext, 25)
					oled.writeString(font, 1, 'loading', 1, true)
				}, 0)
				setTimeout(() => {
					oled.fillRect(xtext, 25, xtext + text.length * 5, 25 + 7, 0)
				}, 50)
				blinkNum ++
				if (blinkNum < 30) setTimeout(blink, 100)
			}
			blink()

			let score = 0
			const progress = () => {
				const pr = Math.floor(Math.random() * 5)
				const xmin = xleft + score
				const xmax = Math.max(xleft + score + pr, xright)
				oled.drawLine(xmin, 16, xmax, 16, 1)
				oled.drawLine(xmin, 17, xmax, 17, 1)
				score = score + pr
				if(score < 100) setTimeout(progress, 100)
			}
			//progress()
		}
	}
]


const play = async () => {
	await sleep(1)
	console.log('started')
	oled.turnOffDisplay()
	console.log('going to sleep')
	await sleep(1)
	oled.clearDisplay()
	oled.turnOnDisplay()
	await sleep(1)
	screen[0].draw(oled)
}
play()
