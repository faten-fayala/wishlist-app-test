const express = require('express');
const path = require('path');
const app = express();
const ConnectDB= require('./config/ConnectDB');
const cors = require('cors');

const directory = path.join(__dirname, "/uploads");

//Connect database
ConnectDB();
app.use(cors());

app.use(express.json()) ;
//Define routes
// app.use('/register', require('./routes/register'));
//  app.use('/login', require('./routes/login'));
app.use("/uploads", express.static(directory)); // upload images
app.use('/auth', require('./routes/admin'));
app.use('/products', require('./routes/products'));
app.use('/wishlists', require('./routes/wishlist'));


const port=8080;
app.listen(port,(err) => 
err ? console.log(err) : console.log(`the server is running on port ${port}`))