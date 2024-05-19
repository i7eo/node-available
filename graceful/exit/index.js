const http = require('http')
const process = require('process')

const server = http.createServer(function(req, res) {
  setTimeout(function() {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('hello world\\n')
  }, 4000)
}).listen(9090, function(err) {
  console.log('listening localhost:9090')
  console.log('pid is: ', process.pid)
})

// 1. 监听信号
process.on('SIGTERM', function() {

  // 2. 关闭 http 链接（处理完当前已发送的请求，并且拒绝接受后续请求）
  server.close(function() {

    // 3. 退出 nodejs 进程
    process.exit(0)
  })

})