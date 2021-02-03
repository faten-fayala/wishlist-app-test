const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;

const WishlistSchema = new Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    name : {
        type:String,
        required:true,
    },
    
});

module.exports = mongoose.model('wishlist' , WishlistSchema );