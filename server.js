var cfenv = require("cfenv");

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(data);
          }
      });
      ws.send("OK");
  });
});
