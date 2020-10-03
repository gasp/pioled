const available = [
  'clearDisplay',
  'dimDisplay',
  'invertDisplay',
  'turnOffDisplay',
  'turnOnDisplay',
  'drawPixel',
  'drawLine',
  'fillRect',
  'setCursor',
  'writeString',
]

const transcode = (instruction, callee) => {
  const { action, payload } = instruction
  if (available.includes(action)) {
    callee[action].apply(null, payload)
  }
}

module.exports = transcode
