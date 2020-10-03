const http = require('http')
const querystring = require('querystring')

const port = process.env.NODE_PORT || 3142
const html = `
  <html><head><meta charset="utf-8" />
  <style>*,input{font-family:monospace} code {color:#333;background:#ddd}</style></head>
  <body>
  use POST:
  <dl>
    <dt>{ action: <code>"clearDisplay"</code>, payload: <code>true</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"dimDisplay"</code>, payload: <code>true</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"invertDisplay"</code>, payload: <code>true</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"turnOffDisplay"</code>, payload: <code>true</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"turnOnDisplay"</code>, payload: <code>true</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"drawPixel"</code>, payload: <code>[[10,10,1],[11,11,1]]</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"drawLine"</code>, payload: <code>[10,10,20,20,1]</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"fillRect"</code>, payload: <code>[10,10,20,20,1]</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"setCursor"</code>, payload: <code>[10,10]</code> }</dt>
    <dd></dd>
    <dt>{ action: <code>"writeString"</code>, payload: <code>['5x7', 1, 'hello', 1, true]</code> }</dt>
    <dd></dd>
  </dl>
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
