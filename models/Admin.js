const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone: Number,
});
module.exports = mongoose.model("admin", AdminSchema);