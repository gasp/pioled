const screen = {
  width: 128,
  height: 32,
}

const scale = 10
const board = {
  width: screen.width * scale,
  height: screen.height * scale,
}

// create an array of binary data, should be using something like
// const map = const buffer = new ArrayBuffer(8);
// const view = new Int32Array(buffer);
// x0,y0 is map[0]
// x1, y0 is map[1]
// x0, y1 is map[screen.width + 1]
const map = new Array(screen.width * screen.height)
console.log(map)

const setup = () => {
  const canvas = document.getElementById('canvas')
  canvas.width = board.width
  canvas.height = board.height
  const ctx = canvas.getContext('2d')

  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // grid
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < screen.width; x++) {
    ctx.beginPath()
    ctx.moveTo(x * scale, 0)
    ctx.lineTo(x * scale, board.height)
    ctx.stroke()
  }
  for (let y = 0; y < screen.height; y++) {
    ctx.beginPath()
    ctx.moveTo(0, y * scale)
    ctx.lineTo(board.width, y * scale)
    ctx.stroke()
  }

  const paint = ({ x, y }) => {
    ctx.fillStyle = '#63ccc6'
    ctx.fillRect(x, y, scale, scale)
  }
  let isDown = false
  document.addEventListener('mousedown', () => {
    isDown = true
  })
  document.addEventListener('mouseup', () => {
    isDown = false
  })
  canvas.addEventListener('mousemove', evt => {
    if (isDown) {
      const mousePos = getMousePos(canvas, evt)
      const start = {
        x: Math.floor(mousePos.x / scale) * scale,
        y: Math.floor(mousePos.y / scale) * scale,
      }
      paint(start)
    }
  }, false)
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



document.addEventListener("DOMContentLoaded", function(){
  setup()
});
