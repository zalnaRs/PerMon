const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

// socket io setup

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

var os = require('os');

io.on('connection', (socket) => {
  console.log('connected');
  socket.emit(
    'os-info',
    JSON.stringify({
      platform: os2.platform(),
      version: os.release(),
      arch: os.arch(),
      totalMem: Math.round(os2.totalmem()) + 'MB',
    })
  );
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

// cpu usage

var os2 = require('os-utils');

setInterval(() => {
  os2.cpuUsage((value) => {
    io.emit('cpuUsageUpdate', Math.round(value * 100) + '%');
  });
  io.emit('freeMemUpdate', Math.round(os2.freemem()) + 'MB');
}, 1000);

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
