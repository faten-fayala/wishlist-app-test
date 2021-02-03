const jwt = require("jsonwebtoken")
require('dotenv').config({ path: './config/.env' })
module.exports = (payload, res) => {
  jwt.sign(payload, process.env.secretKey, (err, token) => {
    if (err) {
      throw err;
    }
      return res.status(200).json({ token });
  });
};