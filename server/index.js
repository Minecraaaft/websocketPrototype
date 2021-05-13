const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const path = require('path');

const server = https.createServer({
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem'))
});

const wss = new WebSocket.Server({server})

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.listen(443, function () {
    console.log('Server is listening on 443');
});