const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = ({
    name: { type: String },
    email: { type: String },
    country: { type: String }
})
const User = mongoose.model('User', userSchema)
module.exports = User