const TIMEOUT = 10 * 1000

const clock = callback => {
  let timer;
  const start = () => {
    timer = setTimeout(callback, TIMEOUT)
  }
  const kill = () => {
    clearTimeout(timer)
  }
  const snooze = () => {
    kill()
    start()
  }
  const stop = () => {
    kill()
    callback()
  }
  return {
    // end it early
    end: callback,
    // reset it to another countdown
    snooze,
    // start the timer
    start,
    // kill the clock
    kill,
    // stop the clock
    stop,
  }
}

module.exports = clock
