const http = require('http')
const querystring = require('querystring')

const port = process.env.NODE_PORT || 3142
const html = `
  <html><head><meta charset="utf-8" /><style>*,input{font-family:monospace}</style></head><body>
  <form method="post" action="/">
  <textarea name="message" autofocus wrap="hard" rows="3" cols="20" maxlength="80">0123456789ABCDEF012340123456789ABCDEF01234</textarea>
  <div style="padding: 10 0"><input type="submit" value="Submit" /></div>
  </form>
  </body></html>
`

/*
  idea is: module.exports {
    callback,
    server
  }
  so that we could call server.close() from outside
*/

module.exports = callback => {
  const server = http.createServer((req, res) => {

    if (req.method == 'POST') {
      let body = ''
      let cleanText = ''

      req.on('data', (data) => {
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
          res.writeHead(200, {'Content-Type': 'application/json'})
          res.end(JSON.stringify({ received: cleanText }))
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.end('<htm>thank you <a href="/">go</a></html>')
        }
      })
      return;
    }

    if (req.headers['content-type'] === 'application/json') {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({message: "ok"}))
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(html)
    }
  })

  const html = `
    <html><head><meta charset="utf-8" /><style>*,input{font-family:monospace}</style></head><body>
    <form method="post">
    <textarea name="message" autofocus wrap="hard" rows="3" cols="20" maxlength="80">0123456789ABCDEF012340123456789ABCDEF01234</textarea>
    <div style="padding: 10 0"><input type="submit" value="Submit" /></div>
    </form>
    </body></html>
  `
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(html)
})

const port = 3000
const host = '127.0.0.1'
server.listen(port)
console.log(`Listening at http://${host}:${port}`)
