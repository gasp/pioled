const http = require('http')
const querystring = require('querystring')

const port = process.env.NODE_PORT || 3142
const html = `
  <html><head><meta charset="utf-8" /><style>*,input{font-family:monospace}</style></head><body>
  <form method="post" action="/">
  <dl>
    <dt>clearDisplay</dt>
    <dd></dd>
    <dt>dimDisplay</dt>
    <dd></dd>
    <dt>invertDisplay</dt>
    <dd></dd>
    <dt>turnOffDisplay</dt>
    <dd></dd>
    <dt>turnOnDisplay</dt>
    <dd></dd>
    <dt>drawPixel</dt>
    <dd></dd>
    <dt>drawLine</dt>
    <dd></dd>
    <dt>fillRect</dt>
    <dd></dd>
    <dt>setCursor</dt>
    <dd></dd>
    <dt>writeString</dt>
    <dd></dd>
  </dl>
  </form>
  </body></html>
`
const handleRequests = (callback) => (req, res) => {
  if (req.method == 'POST') {
    let body = ''
    let cleanText = ''

    req.on('data', data => {
      body += data
    })

    req.on('end', () => {
      if (req.headers['content-type'] === 'application/json') {
        try {
          cleanText = JSON.parse(body)
        } catch (e) {
          console.log('cannot parse json body')
          cleanText = querystring.parse(body)
        }
      } else {
        cleanText = querystring.parse(body)
      }
      callback(cleanText)
      if (req.headers['content-type'] === 'application/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ received: cleanText }))
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<htm>thank you <a href="/">go</a></html>')
      }
    })
    return
  }

  if (req.headers['content-type'] === 'application/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'ok' }))
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
  }
}


module.exports = callback => {
  const server = http.createServer(handleRequests(callback))
  console.log(`Listening on port ${port}`)
  server.listen(port)
}
