const mongoose = require('mongoose')

/**
 *      ROLES (Seperate interfaces for each):
 *          - Customer: 'customer'
 *          - Cashier (Admin): 'cashier'
 * 
 *      Customer User Properties:
 *          - name
 *          - email
 *          - phone
 *          - birthday
 *          - password
 *          - points
 *          - coupons
 *          - role
 * 
 *      Cashier User Properties (Will include other properties eg points & coupons, it just wont be used):
 *          - name
 *          - email ? for login only
 *          - phone ? for login only
 *          - password
 *          - role
 */

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
        },
        coupons: {
            type: Array,
            required: true
        },
        role: {
            type: String,   // Either: 'customer' or 'cashier'
            required: true
        }
    }
)

module.exports = mongoose.model('User', userSchema)
