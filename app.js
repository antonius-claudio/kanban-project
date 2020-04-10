require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes');
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
console.log(process.env.secret);
console.log(process.env.roundSalt);
console.log(process.env.client_id_oauth_google);
app.use(cors());
app.use(router);

// io.on('connection', function() {
    //     console.log('there is a connection');
    // })
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});
http.listen(port, () => {
    console.log('listening port ', port);
})