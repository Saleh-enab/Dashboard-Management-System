const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, require: true, minLength: 3 },
    lastName: { type: String, require: true, minLength: 3 },
    tel: { type: String, require: true },
    email: { type: String, require: true, minLength: 3 },
    tech: { type: String, require: true, minLength: 3 },
    nonTech: { type: String, require: true, minLength: 2 },
    image: { type: String, requited: true }
}, { timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user