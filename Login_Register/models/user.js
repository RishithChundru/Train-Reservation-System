const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    mobile: String,
    username: String,
    email: { type: String, unique: true },
    dob: String,
    password: String,
    security_question: String,
    security_answer: String,
});

module.exports = mongoose.model("User", UserSchema);
