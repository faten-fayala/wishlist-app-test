const mongoose = require('mongoose');
 require('dotenv').config({ path: './config/.env' })
const ConnectDB = () => {
 mongoose.connect(process.env.mongoUrl,{ useNewUrlParser: true , useUnifiedTopology: true  }, (err) => {
    err ? console.log(err) : console.log('database is connected')  
})   
}
 module.exports=ConnectDB;

