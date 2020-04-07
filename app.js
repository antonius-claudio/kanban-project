require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
console.log(process.env.secret);
console.log(process.env.roundSalt);
console.log(process.env.client_id_oauth_google);
app.use(cors());
app.use(router);
app.listen(port, () => {
    console.log('listening port ', port);
})