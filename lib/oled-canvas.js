const { createCanvas, registerFont } = require('canvas')

const BLACK = 0x00
const WHITE = 0x01
const GRAY = '#ccc'

class OledCanvas {
  constructor(bus, { width, height, address }) {
    this._step = 0
    this._bus = bus
    this._canvas = createCanvas(width, height)
    this._ctx = this._canvas.getContext('2d', { pixelFormat: 'A1' })
    this._ctx.quality = 'nearest'
    this._pageHeight = 8
    this._pageBytesCache = new Uint8Array((width * height) / this._pageHeight)
    this._width = width
    this._height = height
    this._cursor = [0, 0]
    console.log({ stream: !!bus, width, height, address })
  }
  clearDisplay() {
    this._ctx.fillStyle = BLACK
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._output()
    return this
  }
  dimDisplay() {
    console.log('dimDisplay: not implemented')
    this._output()
    return this
  }
  invertDisplay() {
    console.log('dimDisplay: not implemented')
    // should be flipping primary and backgroun color
    this._output()
    return this
  }
  turnOffDisplay() {
    this._ctx.fillStyle = GRAY
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._output()
    return this
  }
  turnOnDisplay() {
    this._ctx.fillStyle = BLACK
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._output()
    return this
  }

  drawPixel(pixels) {
    pixels.map(([x, y, color]) => {
      this._ctx.fillStyle = color === 1 ? WHITE : BLACK
      this._ctx.fillRect(x, y, 1, 1)
    })
    this._output()
    return this
  }
  drawLine(x0, y0, x1, y1, color = 1) {
    this._ctx.strokeStyle = color === 1 ? WHITE : BLACK
    this._ctx.beginPath()
    this._ctx.moveTo(x0, y0)
    this._ctx.lineTo(x1, y1)
    this._ctx.stroke()
    this._output()
    return this
  }

  fillRect(x0, y0, x1, y1, color = 1) {
    this._ctx.fillStyle = color === 1 ? WHITE : BLACK
    this._ctx.fillRect(x0, y0, x1, y1)
    this._output()
    return this
  }

  drawBitmap() {
    console.log('drawBitmap: not implemented, this should use byte manipulation with canvas')
    this._output()
    return this
  }

  setCursor(x, y) {
    this._cursor = [x, y]
    this._output()
    return this
  }

  writeString(font, size, text, color = 1, wrapping) {
    this._ctx.fillStyle = color === 1 ? WHITE : BLACK
    const [x, y] = this._cursor
    console.log('drawBitmap: not implemented, this should use byte manipulation with canvas')
    this._ctx.font = '10px monospace'
    this._ctx.fillText(text, x, y)
    this._output()
    return this
  }

  _output() {
    if (!!this._bus) {
      // prettier-ignore
      const palette = new Uint8ClampedArray([
        //r   g   b   a
          0,  50, 50, 255, // index 1
          10,200,200, 255, // index 2
      ])
      const stream = this._canvas.createPNGStream({
        palette: palette,
        backgroundIndex: 0, // optional, defaults to 0
      })
      this._bus(this._step, stream)
    }
    this._step += 1
  }
  _export() {
    console.log('<img src="' + this._canvas.toDataURL() + '" />')
  }
}

module.exports = OledCanvas

/*
module.exports = (Oled) => {
  return class OledCanvas {
    constructor(..._args) {
      const args = _args.slice(0, _args.length - 1);
      const opts = _args[_args.length - 1];
      super(...args, opts);

      if (opts.fontFile) {
        // use filename as family name
        const fontFamily = opts.fontFile.replace(/^(.*\/)?\.[a-zA-Z]+$/, '');

        this.fontFamily = fontFamily;
        registerFont(opts.fontFile, { family: fontFamily });
      } else {
        this.font = 'monospace';
      }

      const canvas = createCanvas(this.WIDTH, this.HEIGHT);
      this._ctx = canvas.getContext('2d');
      this._pageHeight = 8;
      this._pageBytesCache = new Uint8Array(this.WIDTH * this.HEIGHT / this._pageHeight);
    }
/*
    _canvasPixelToOledPixel(pixel) {
      const threshold = 127;

      // assume pi using little-endian
      const r = pixel & 0xff;
      // const g = pixel >>> 8 & 0xff;
      // const b = pixel >>> 16 & 0xff;
      // const a = pixel >>> 24;

      // assume gray pixel has the same amount of r, g and b
      return r < threshold ? 1 : 0;
    }

    clearCanvas() {
      this.fillRect(0, 0, this.WIDTH, this.HEIGHT, { color: WHITE });
      return this;
    }

    drawLine(x0, y0, x1, y1, { color = BLACK } = {}) {
      const ctx = this._ctx;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      return this;
    }

    drawPixels(pixels) {
      if (!Array.isArray(pixels[0])) pixels = [pixels];

      pixels.forEach((elem) => {
        const [x, y, pixel] = elem;
        this.fillRect(x, y, 1, 1, { color: pixel ? BLACK : WHITE });
      });

      return this;
    }

    fillRect(x, y, w, h, { color = BLACK } = {}) {
      const ctx = this._ctx;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);

      return this;
    }

    getContext() {
      return this._ctx;
    }

    drawString(string, { fontSize, color = BLACK } = {}) {
      if (!Number.isFinite(fontSize) || fontSize < 0) {
        throw new Error('fontSize must be positive number.');
      }

      const ctx = this._ctx;
      ctx.font = `${fontSize}px "${this.fontFamily}"`;
      ctx.textBaseline = 'bottom';

      const width = ctx.measureText(string).width;

      this.fillRect(this.cursor_x, this.cursor_y, width, { fontSize, color: WHITE });

      ctx.fillStyle = color;
      ctx.fillText(string, this.cursor_x, this.cursor_y + fontSize);

      return this;
    }

    _pageIndex(page, x) {
      return page * this.WIDTH + x;
    }

    // set the start and endbyte locations for oled display update
    _sendDisplaySeq(startPage, endPage, startX, endX) {
      const displaySeq = [
        // column start and end address
        this.COLUMN_ADDR,
        this.screenConfig.coloffset + startX,
        this.screenConfig.coloffset + endX,
        // page start and end address
        this.PAGE_ADDR,
        startPage,
        endPage,
      ];

      displaySeq.forEach(byte => {
        this._transfer('cmd', byte);
      });
    }

    // Full update -- faster when most pixels are updated
    update() {
      // wait for oled to be ready
      this._waitUntilReady(function() {
        const ctx = this._ctx;
        const pageLen = this.HEIGHT / this._pageHeight;

        this._sendDisplaySeq(0, pageLen - 1, 0, this.WIDTH - 1);

        // send canvas data
        for (let page = 0; page < pageLen; page++) {
          const pagePixels = new Uint32Array(ctx.getImageData(0, page * this._pageHeight, this.WIDTH, this._pageHeight).data.buffer) // Uint8Array to Uint32Array
            .map(this._canvasPixelToOledPixel);

          for (let x = 0; x < this.WIDTH; x++) {
            const pageIndex = this._pageIndex(page, x);
            const pageByte = pagePixels[x] +
              pagePixels[x + this.WIDTH] * 2 +
              pagePixels[x + this.WIDTH * 2] * 2 ** 2 +
              pagePixels[x + this.WIDTH * 3] * 2 ** 3 +
              pagePixels[x + this.WIDTH * 4] * 2 ** 4 +
              pagePixels[x + this.WIDTH * 5] * 2 ** 5 +
              pagePixels[x + this.WIDTH * 6] * 2 ** 6 +
              pagePixels[x + this.WIDTH * 7] * 2 ** 7;

            this._pageBytesCache[pageIndex] = pageByte;
            this._transfer('data', pageByte);
          }
        }
      }.bind(this));
    }

    partialUpdate() {
      // wait for oled to be ready
      this._waitUntilReady(function() {
        const ctx = this._ctx;
        const pageLen = this.HEIGHT / this._pageHeight;

        // send canvas data
        for (let page = 0; page < pageLen; page++) {
          const pagePixels = new Uint32Array(ctx.getImageData(0, page * this._pageHeight, this.WIDTH, this._pageHeight).data.buffer) // Uint8Array to Uint32Array
            .map(this._canvasPixelToOledPixel);

          for (let x = 0; x < this.WIDTH; x++) {
            const pageIndex = this._pageIndex(page, x);
            const pageByte = pagePixels[x] +
              pagePixels[x + this.WIDTH] * 2 +
              pagePixels[x + this.WIDTH * 2] * 2 ** 2 +
              pagePixels[x + this.WIDTH * 3] * 2 ** 3 +
              pagePixels[x + this.WIDTH * 4] * 2 ** 4 +
              pagePixels[x + this.WIDTH * 5] * 2 ** 5 +
              pagePixels[x + this.WIDTH * 6] * 2 ** 6 +
              pagePixels[x + this.WIDTH * 7] * 2 ** 7;

            if (this._pageBytesCache[pageIndex] === pageByte) {
              continue;
            }

            this._sendDisplaySeq(page, page, x, x);
            this._pageBytesCache[pageIndex] = pageByte;
            this._transfer('data', pageByte);
          }
        }
      }.bind(this));
    }
  }
};
*/
