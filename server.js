const http = require('http')
const querystring = require('querystring')

// module.export = (callback)

const server = http.createServer((req, res) => {

  if (req.method == 'POST') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })

    req.on('end', () => {
      const cleanText = querystring.parse(body)
      console.log(cleanText)
      // callback(querystring.parse(body))
    })
  }

  const html = `
    <html><head><meta charset="utf-8" /><style>*,input{font-family:monospace}</style></head><body>
    <form method="post" action="http://localhost:3000">
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
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
