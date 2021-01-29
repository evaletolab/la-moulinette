const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const backend = new ShareDB();

//
// run server and client
const env = process.env.NODE_ENV || 'development';
const exec = require('child_process').exec;
const message = `
An error occurred while attempting to start ${env}.
Make sure that it is not running in another window.\n`;
let context = {};
switch (env) {
    case 'angular':
        context.root = '../angular/dist/angular';
        context.port = 4200;
        exec('ng build --watch',{cwd:'angular'}, function callback(error, stdout, stderr) {
            if (error) {
              console.log(message);
              throw error;
            }
            console.log(stdout)
          });                
        break;
    case 'vuejs':
    
        break;
    default:
        console.log('---> NODE_ENV=angular|vuesjs|nextjs node server/app');
        process.exit();
}

createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
    const connection = backend.connect();
    const doc = connection.get('la-moulinette');
    doc.fetch(function (err) {
        if (err) throw err;
        if (doc.type === null) {
            doc.create({ content: 'the moulinette doc content' }, callback);
            return;
        }
        callback();
    });
}

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    const app = express();
    app.use(express.static('./angular/dist/angular'));
    const server = http.createServer(app);

    // Connect any incoming WebSocket connection to ShareDB
    const wss = new WebSocket.Server({ server: server });
    wss.on('connection', function (ws) {
        const stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });

    server.listen(context.port);
    console.log('Listening on http://localhost:'+context.port);
}
