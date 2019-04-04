const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
		type: Date,
		required: true,
		default: Date.now()
	},
    updatedAt: {
        type: Date,
		required: true,
		default: Date.now()
    },
});
UsersSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 12);
}

UsersSchema.methods.comparePassword = function (password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
let User = "";
module.exports = User = mongoose.models.User || mongoose.model('User', UsersSchema);