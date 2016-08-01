var http = require('http');
var querystring = require('querystring');

// 帧听服务器的 request 事件
http.createServer(function(req, res) {
    var postData = '';
    req.setEncoding('utf8');

    // 帧听请求的 data 事件
    req.on('data', function(trunk) {
        postData += trunk;
    });

    // 帧听请求的 end 事件
    req.on('end', function() {
        res.end(postData);
    });
}).listen(8080);

console.log('服务器启动完成');

