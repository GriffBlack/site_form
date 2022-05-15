const http = require('http');
const fs = require('fs');
const path = require('path');

// server
http.createServer( (req, res) => {
    // простейший роутинг первый это просто корень = /
    if (req.url === '/'){
        sendRes('index.html', 'text/html', res);
    }
    else if (req.method === 'POST') {
        about2(req, res);
    }
    else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST') {

    }
    else {
        sendRes(req.url, getContentType(req.url), res);
    }
    // хагружаем файл в uploads
    // статика

}).listen(3000, () => {
    console.log('server start 3000')
})

function sendRes(url, contentType, res) {
    let file = path.join(__dirname+'/static/', url);
    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            console.log(`error 404 ${err}`)
        }
        else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
            console.log(`res 200 ${file}`);
        }
    })
}

// отправка ресурсов

// тип контента
function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "text/json";
        default:
            return "application/octate-stream";

    }
}

// сохранение файла
function saveFile(req, res) {
    var body = '';
    var filePath = __dirname + '/public/data.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
}

function about(req, res) {
    res.end("about");

}function about2(req, res) {
    res.end("Ответ сервера на Post запрос");
}