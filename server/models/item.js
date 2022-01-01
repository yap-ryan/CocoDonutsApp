const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imgSrc: {
            type: String,
            required: true
        },
        type: {               // Either type 'donut' or 'coffee'
            type: String,
            required: true
        },
        pointCost: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('Item', itemSchema)
