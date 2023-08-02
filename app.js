const express = require('express');
const app = express();
const http = require('node:http');
const socketIO = require('socket.io');

const server = http.createServer(app);

const io = socketIO(server, { cors: { origin: '*' } });


io.on('connection', (socket) => {
    console.log(socket.id);
    console.log(socket.handshake);


    // ---------------- ONE TO ONE -----------------------

    socket.on('message:create', (messageData) => {
        console.log(messageData, ' MESSAGE DATA');

        // ONE-TO-ONE MESSAGE
        socket.emit('message:receive', { ok: true });
    });


    // ---------------- BROADCAST --------------------


    socket.on('broadcast:all', () => {
        // // Send to all connected sockets
        // io.emit('alert', 'Повітряна тривога');

        // Send to all connected sockets EXCEPT SENDER
        socket.broadcast.emit('alert', 'Повітряна тривога');
    });

    // ----------------- ROOMS -------------------

    socket.on('room:joinUser', ({ roomId }) => {
        socket.join(roomId); // JOIN ROOM
        // socket.leave(roomId); // LEAVE ROOM

        // // SEND TO ALL USERS IN ROOM
        // io.to(roomId).emit('room:newUserAlert', socket.id);

        // SEND TO ALL USERS IN ROOM EXCEPT SENDER
        socket.to(roomId).emit('room:newUserAlert', socket.id);
    })
})

server.listen(3000, () => {
    console.log('Listen', 3000);
});