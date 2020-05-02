const clock = require('./clock')
const t0 = new Date().getTime()

const stopwatch00 = clock(() => {
  var t3 = new Date().getTime()
  console.log(`00 finished in ${(t3 - t0)/1000} seconds`)
})
const stopwatch10 = clock(() => {
  const t1 = new Date().getTime()
  console.log(`10 finished in ${(t1 - t0)/1000} seconds`)
})
const stopwatch15 = clock(() => {
  var t2 = new Date().getTime()
  console.log(`15 finished in ${(t2 - t0)/1000} seconds`)
})

stopwatch00.start()
stopwatch10.start()
stopwatch15.start()

stopwatch00.end()
setTimeout(
  () => {
    stopwatch15.snooze()
  },
  5000
)

// stop again 00
setTimeout(
  () => {
    stopwatch00.end()
  },
  1000
)
