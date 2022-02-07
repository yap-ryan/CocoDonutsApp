const express = require('express')
const router = express.Router()

// Importing User model 
const User = require('../models/user')

// Password hashing handler
const bcrypt = require('bcrypt')


// ______________________GET_______________________________


// All requests should be async to prevent process blocking
// Handle Get requests for ALL users
router.get('/', async (req,res) => {
    try{
        // Get all users
        const users = await User.find()
        res.json(users)
        console.log('Get (all users) Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }
})

// Handle Get requests for individual users BY ID
router.get('/by-id', async (req,res) => {

    let { id } = req.body

    try{
        // Find user
        const user = await User.findById(id)

        res.json({
            status: 'SUCCESS', message: 'User found', data: user
        })
        console.log('Get Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Error finding user by id with input: ' + req.body.id })
        console.error(err)
    }
})

// Handle Get requests for individual users BY PHONE
// Could return multiple users but SHOULD ONLY RETURN 1 USER
router.get('/by-phone', async (req,res) => {

    let { phone } = req.body

    try{
        const user = await User.findOne({"phone": req.body.phone})

        if (user == null) {
            res.json({ status: 'ERROR', message: 'Could not find user by phone number'  })
        } else {
            res.json({
                status: 'SUCCESS', message: 'User found', data: user
            })
            console.log('Get Success')
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Error finding user by phone number with input: ' + req.body.phone })
        console.error(err)
    }
})

// Handle Get requests for individual users BY EMAIL
// Could return multiple users but SHOULD ONLY RETURN 1 USER
router.get('/by-email/', async (req,res) => {

    let { email } = req.body

    try{
        const user = await User.findOne({"email": email})

        if (user == null) {
            res.json({ status: 'ERROR', message: 'Could not find user by email' })
        } else {
            res.json({
                status: 'SUCCESS', message: 'User found', data: user
            })
            console.log('Get Success')
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Error finding user user by email with input: ' + req.body.email })
        console.error(err)
    }
})


// ______________________POST_______________________________


// Handle Signup Post requests
// NOTE: Only used to create new CUSTOMER accounts, cashier accounts created manually
router.post('/signup', async (req,res) => {
    let {name, email, phone, birthday, password} = req.body

    name = name.trim()
    email = email.trim().toLowerCase()
    phone = phone.trim()
    password = password.trim()

    // Conditions for user info before posting new user
    if (name == '' || email == '' || phone == '' || birthday == '' || password == '' ) {
        res.json({
            status: 'ERROR',
            message: 'Empty input field'
        })
    } else if (! /^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'ERROR',
            message: 'Invalid name entered: Please only use letters'
        })
    } else if (! /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
        res.json({
            status: 'ERROR',
            message: 'Invalid email entered'
        })
    } else if (! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
        res.json({
            status: 'ERROR',
            message: 'Invalid phone number entered'
        })
    } else if (! /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
        res.json({
            status: 'ERROR',
            message: 'Password must use upper and lower case letters, have at least 1 number, and be at least 8 chracters'
        })
    } else {
        // Check if email and phone already being used before posting
        try{    
            const usersWithEmail = await User.find({email})
            const usersWithPhone = await User.find({phone})

            if (usersWithEmail.length > 0) { // If user exists w/ same email
                res.json({
                    status: 'ERROR',    
                    message: 'Email already in use'
                })
            } else if (usersWithPhone.length > 0) { // If user exists w/ same phone 
                res.json({
                    status: 'ERROR',    
                    message: 'Phone Number already in use'
                })
            } else {
                try {
                    //Everything went well! Hash provided password
                    const hashedPassword = await bcrypt.hash(password, 10) 

                    const newUser = new User(
                        {
                            name,
                            email,
                            phone,
                            birthday: new Date(birthday),
                            password: hashedPassword,
                            points: 0,
                            coupons: [],
                            role: 'customer'
                        }
                    )

                    // Save new user to db
                    try{    
                        const result = await newUser.save()

                        delete result.password

                        res.json({
                            status: 'SUCCESS',
                            message: 'Sign-up Successful',
                            data: result
                        })
                        console.log('Sign-up Success')
                    } catch(err){
                        res.json({
                            status: 'ERROR', message: 'Could not save user to db on signup' })
                        console.error(err)                
                    }

                } catch (err) {
                    res.json({
                        status: 'ERROR', 
                        message: 'Server Error while hashing password' 
                    })
                    console.error(err)
                }

            }

        } catch (err) {
            res.json({
                status: 'ERROR', message: 'Server Error while checking for existing users with same email or phone' })
            console.error(err)
        }
    }  
})

// Handle Login Post Requests
// CUSTOMER & CASHIER/ADMIN ACCOUNTS
router.post('/login', async (req,res) => {
    let {email, password} = req.body

    email = email.trim().toLowerCase()

    if (email == "" || password == "") {
        res.json({
            status: 'ERROR',
            message: 'Empty input field'
        })
        console.log('Server Error: Empty input field')
    } else {
        try {
            const user = await User.find({email}).select("+password")
            if(user.length) {// If user exists
                const hashedPassword = user[0].password

                try {
                    const passwordsMatch = await bcrypt.compare(password, hashedPassword)

                    if (passwordsMatch) {

                        // Extra Security:
                        // Used to prevent hashed password from being returned in response 
                        const respData = {
                            _id: user[0]._id,
                            name: user[0].name,
                            email: user[0].email,
                            phone: user[0].phone,
                            birthday: user[0].birthday,
                            points: user[0].points,
                            coupons: user[0].coupons,
                            role: user[0].role
                        }

                        res.json({
                            status: 'SUCCESS',
                            message: 'Login Successful',
                            data: respData
                        })
                        console.log('Login Success')

                    } else {
                        res.json({
                            status: 'ERROR',
                            message: "Invalid password entered",
                        })
                        console.log('Server Error: Invalid password entered')
                    }
                } catch (err) {
                    res.json({
                        status: 'ERROR',
                        message: "Error while comparing passwords"
                    })
                    console.log('Server Error: Error while comparing passwords')
                }
            } else {
                res.json({
                    status: 'ERROR',
                    message: "Email entered does not exist"
                })
                console.log('Server Error: Email entered does not exist')
            }

        } catch (err) {
            res.json({
                status: 'ERROR', 
                message: 'Server Error while checking for existing user' 
            })
            console.error(err)
        }

    }
})


// ______________________PATCH___________________________________


// Handle Patch requests BY ID 
// Should only be used when a user is updating account info
router.patch('/:id', async (req,res) => {

    let {name, email, phone, password} = req.body

    try {
        const user = await User.findById(req.params.id)
        let valueChanged = false

        // Check for same name or null
        if (name != null && name != user.name){
            
            // New name only letters allowed
            if (/^[a-zA-Z ]*$/.test(name)) {
                user.name = name
                valueChanged = true
            } else {
                res.json({
                    status: 'ERROR',
                    message: 'Invalid name entered: Please only use letters'
                })
                console.log('No Update: Name conditions not met')
            }
        }

        // Only patch password if the password will change & not null
        if (password != null && password != user.password){

            // New password must meet conditions
            if (/^(?!.*[$ ]).{7,20}$/.test(password)) {
                // Conditions met, update password
                user.password = password 
                valueChanged = true
            } else {
                res.json({
                    status: 'ERROR',
                    message: 'Password must be 7-20 chracters long, and contain no $ or spaces'
                })
                console.log('No Update: Password conditions not met')
            }
        }

        // Only patch email if the email will change & not null
        if (email != null && email.toLowerCase() != user.email){
            // New Email must fit regex
            if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
                user.email = email.toLowerCase()
                valueChanged = true
            } else {
                res.json({
                    status: 'ERROR',
                    message: 'Entered email is invalid'
                })
                console.log('No Update: Entered email is invalid')
            }
        }  
        
        if (phone != null && phone != user.phone) {
            if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)) {
                user.phone = phone
                valueChanged = true
            } else {
                res.json({
                    status: 'ERROR',
                    message: 'Invalid phone number entered'
                })
                console.log('No Update: Entered phone is invalid')
            }
        }

        
        // Only patch points if the points will change & not null
        if (req.body.points != null && req.body.points != user.points){
            user.points = req.body.points 
            valueChanged = true
        }
        
        // Only save change if a value is changed (prevent redundant db queries)
        if (valueChanged) {
            const result = await user.save()

            res.json({
                status: 'SUCCESS',
                message: 'Update successful',
                data: result
            })
            console.log('Update Successful')
        } else {
            res.json({
                status: 'ERROR',
                message: 'No Update: Values inputed identical to those in database'
            })
            console.log('No Update: Values inputed identical to stored values (could be another issue)')
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }

})

// Handle Patch Requests for when customers Earn Coupons / Use Points  
// This should be used when customer redeems coupons in the point shop (DonutShopScreen or CoffeeShopScreen)
router.patch('/addCoupon/:id', async (req,res) => {
    
    // REQUIRED: couponToAdd (we never need to deduct points without other actions)
    let {couponToAdd, pointCost} = req.body

    // Complete coupon code by adding 'unique' coupon ID to it
    couponToAdd = setCouponId(couponToAdd)

    try {
        const user = await User.findById(req.params.id)

        let endingBal = user.points
        
        if (pointCost) {
            endingBal = endingBal - pointCost
        }

        // Check if user has enough points, if not, respon w/ error msg
        if (endingBal < 0) {
            res.json({
                status: 'ERROR', message: 'Error: User does not have enough points'
            })
            console.log('Error: User deos not have enough points')
        } else {
            try {
                // Update user's coupons & points
                const result = await User.updateOne(
                    { "_id": req.params.id },
                    { $set: { "points": endingBal }, $push: { "coupons": couponToAdd } }
                ) 
    
                res.json({
                    status: 'SUCCESS', message: 'Customer account successfully updated', 
                    data: { 
                        "couponAdded": couponToAdd,
                        "newPointBal": endingBal
                    }
                })
                console.log('Update Successful')
            } catch (err) {
                res.json({
                    status: 'ERROR', message: 'Error saving data to user account' })
                console.error(err)
            }     
        }
         
    } catch (err) {
        res.json({
            status: 'ERROR', message: 'Error finding user' })
        console.error(err)
    }
})


// Handle Patch Requests for when customers Use Coupon / Earn Points 
// This should be used when customer uses their coupons or earn points at point of sale
// Request should come from a Cashier user at point of sale
router.patch('/pointOfSale/:id', async (req,res) => {
    
    let {couponToRemove, pointsEarned} = req.body
    try {
        const user = await User.findById(req.params.id)

        let couponFound = false

        // Search for coupon in user account if couponToRemove in req.body
        if (couponToRemove) {
            // Find couponToRemove in user.coupons
            for (const coupon of user.coupons) {
                if (coupon === couponToRemove) {
                    couponFound = true
                    break
                }
            }
        }        

        // If coupon code was in body AND not found in account, respond with an error message
        if (couponToRemove && couponFound === false) {
            res.json({
                status: 'ERROR', message: 'Coupon not found on user account' })
            console.error(err)
        } else {

            let endingBal = user.points

            if (pointsEarned) {
                endingBal = user.points + pointsEarned
            }

            try {
                const result = await User.updateOne(
                    { "_id": req.params.id },
                    { $set: { "points": endingBal }, $pull: { "coupons": couponToRemove } }
                ) 

                res.json({
                    status: 'SUCCESS',
                    message: 'Customer account successfully updated',
                    data: result
                })
                console.log('Update Successful')
            } catch (err) {
                res.json({
                    status: 'ERROR', message: 'Error saving data to user account' })
                console.error(err)
            }    
        }
        return
    } catch (err) {
        res.json({
            status: 'ERROR', message: 'Error finding user' })
        console.error(err)
    }
})

/**
 *  This function should take in a partial coupon code (includes itemID, discount, expiry)
 *   and add a unique(highly random and hopefully unique) coupon id to the end of the coupon code.
 *   
 *  The purpose of a coupon ID is to let customers give the ID to cashier if the QR code for some reason does not work
 */
const setCouponId = (partialCode) => {

    // Length of Coupon ID (Longer better, BUT less efficient at Point of Sale)
    const length = 6

    // Declare all characters that may appear in Coupon ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    // Pick characers randomly
    let couponId = '';
    for (let i = 0; i < length; i++) {
        couponId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return partialCode + '#' + couponId
} 




// Handle Delete requests
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const deletedUser = await user.delete()
        res.json({message: 'User successfully deleted', data: deletedUser})
        console.log('Delete Successful for user: ' + deletedUser)
    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error when trying to delete user' })
        console.error(err)
    }
})

module.exports = router
