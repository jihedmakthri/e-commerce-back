const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastname: {type: String, required: true},
        username: { type: String, required: true, unique:true },
        email: { type: String, required: true, unique:true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false },
        img: {type: String}
        
    },
    {timestamps:true}
)

module.exports = mongoose.model("USER", userSchema)