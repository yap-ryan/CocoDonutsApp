const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false     // Prevents password from being returned in user query
        },
        points: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('User', userSchema)
