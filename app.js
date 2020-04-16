require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes');
let io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
console.log(process.env.secret);
console.log(process.env.roundSalt);
console.log(process.env.client_id_oauth_google);
app.use(cors());
app.use(router);

io.on('connection', function (socket) {
    console.log('user connected');
    socket.on('createTask', function (payload) {
        console.log('createeee', payload);
        socket.broadcast.emit('createTask', payload);
    })
    socket.on('deleteTask', function (id) {
        console.log('deleeetee', id);
        socket.broadcast.emit('deleteTask', id);
    })
    socket.on('updateTask', function (payload) {
        console.log('updateee', payload);
        socket.broadcast.emit('updateTask', payload);
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});

http.listen(port, () => {
    console.log('listening port ', port);
})