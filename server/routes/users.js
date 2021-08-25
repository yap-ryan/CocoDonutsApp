const express = require('express')
const router = express.Router()

// Importing User model 
const User = require('../models/user')

// Password hashing handler
const bcrypt = require('bcrypt')

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

// Handle Get requests for individual users
router.get('/:id', async (req,res) => {
    try{
        // Find user
        const user = await User.findById(req.params.id)
        res.json(user)
        console.log('Get Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }
})

// Handle Signup Post requests
router.post('/signup', async (req,res) => {
    let {name, email, password} = req.body

    name = name.trim()
    email = email.trim()
    password = password.trim()


    // Conditions for user info before posting new user
    if (name == '' || email == '' || password == '' ) {
        res.json({
            status: 'ERROR',
            message: 'Server Error: Empty input field'
        })
    } else if (! /^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'ERROR',
            message: 'Server Error: Invalid name entered'
        })
    } else if (! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: 'ERROR',
            message: 'Server Error: Invalid email entered'
        })
    } else if (password.length < 8) {
        res.json({
            status: 'ERROR',
            message: 'Server Error: Password too short'
        })
    } else {
        // Check if user already exists before posting
        try{    
            const user = await User.find({email})
            if (user.length > 0) { // If user exists
                res.json({
                    status: 'ERROR',    
                    message: 'Server Error: User with provided email already exists'
                })
            } else {
                try {
                    //Everything went well! Hash provided password
                    const hashedPassword = await bcrypt.hash(password, 10) 

                    const newUser = new User(
                        {
                            name,
                            email,
                            password: hashedPassword,
                            points: 0
                        }
                    )

                    // Save new user to db
                    try{    
                        const result = await newUser.save()
                        res.json({
                            status: 'SUCCESS',
                            message: 'Sign-up Successful',
                            data: result
                        })
                        console.log('Sign-up Success')
                    } catch(err){
                        res.json({
                            status: 'ERROR', message: 'Server Error: Could not save user to db on signup' })
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
                status: 'ERROR', message: 'Server Error while checking for existing user' })
            console.error(err)
        }
    }  
})

// Handle Login Post Requests
router.post('/login', async (req,res) => {
    let {email, password} = req.body

    email = email.trim()
    password = password.trim()

    if (email == "" || password == "") {
        res.json({
            status: 'ERROR',
            message: 'Server Error: Empty input field'
        })
    } else {
        try {
            const user = await User.find({email})
            if(user.length) {// If user exists
                const hashedPassword = user[0].password

                try {
                    const passwordsMatch = await bcrypt.compare(password, hashedPassword)

                    if (passwordsMatch) {
                        res.json({
                            status: 'SUCCESS',
                            message: "Login Successful",
                            data: user
                        })
                        console.log('Login Success')

                    } else {
                        res.json({
                            status: 'ERROR',
                            message: "Server Error: Invalid password entered",
                        })
                    }
                } catch (err) {
                    res.json({
                        status: 'ERROR',
                        message: "Server Error: Error while comparing passwords"
                    })
                }
            } else {
                res.json({
                    status: 'ERROR',
                    message: "Server Error: Emailed entered does not exist"
                })
            }

        } catch (err) {
            res.json({
                status: 'ERROR', message: 'Server Error while checking for existing user' })
            console.error(err)
        }

    }
})


// Handle Patch requests
router.patch('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        let valueChanged = false

        // Only patch password if the password will change & not null
        if (req.body.password != null && req.body.password != user.password){
            user.password = req.body.password 
            valueChanged = true
        }

        // Only patch email if the email will change & not null
        if (req.body.email != null && req.body.email != user.email){
            user.email = req.body.email 
            valueChanged = true
        }   
        
        // Only patch points if the points will change & not null
        if (req.body.points != null && req.body.points != user.points){
            user.points = req.body.points 
            valueChanged = true
        }
        
        // Only save change if a value is changed (prevent redundant db queries)
        if (valueChanged) {
            const a1 = await user.save()
            res.json(a1)
            console.log('Patch/Update Successful')
        } else {
            res.json({message: 'No Patch/Update: Values inputed identical to those in database'})
            console.log('No Patch/Update: Values inputed identical to database')
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }

})

// Handle Delete requests
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const a1 = await user.delete()
        res.json({message: 'User successfully deleted'})
        console.log('Delete Successful')
    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)

    }
})

module.exports = router
