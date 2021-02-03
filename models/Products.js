const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const ProductsSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    wishlist: {
        type: mongoose.Types.ObjectId,
        ref: 'wishlist',
    },
    name : {
        type:String,
        required:true,
    },
    image: {
        type: String,
    },
    price : {
        type:String,
        // required:true,
    },
    description : {
        type:String,
        // required:true,
    },
    wishlist : {
        type : String,
        // required :true,
    },
    status : {
        type : String,
        // required :true,
    },
});
module.exports = mongoose.model('product' , ProductsSchema );