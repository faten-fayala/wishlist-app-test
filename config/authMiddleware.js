require('dotenv').config({ path: './config/.env' })

const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    // Get token from the header
    const token = req.header('auth-token')

    // check if token exists
    if(!token){
        return res.status(401).json({ msg: [{ msg: "No token, access denied!!" }] })
    }

    jwt.verify(token, process.env.secretKey, (err, payload) => {
        if(err){
            res.status(401).json({msg: 'Token not valid!'})
        }

        req.userId = payload.userId
        next()
    })
}