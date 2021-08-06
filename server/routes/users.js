const express = require('express')
const router = express.Router()

// Importing User model 
const User = require('../models/user')

// All requests should be async to prevent process blocking
// Handle Get requests for ALL users
router.get('/', async (req,res) => {
    try{
        // Get all users
        const users = await User.find()
        res.json(users)
        console.log('Get (all users) Success')

    } catch(err) {
        res.status(500).json({ message: 'Server Error' })
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
        res.status(500).json({ message: 'Server Error' })
        console.error(err)
    }
})

// Handle Post requests
router.post('/', async (req,res) => {
    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            sub: req.body.sub
        }
    )

    try{    
        // Save new user to db
        const a1 = await user.save()
        res.json(a1)
        console.log('Post Success')
    } catch(err){
        res.status(500).json({ message: 'Server Error' })
        console.error(err)

    }

})

// Handle Patch requests
router.patch('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        let valueChanged = false

        // Only patch sub if the sub will change & not null
        if (req.body.sub != null && req.body.sub != user.sub){
            user.sub = req.body.sub 
            valueChanged = true
        }

        // Only patch email if the email will change & not null
        if (req.body.email != null && req.body.email != user.email){
            user.email = req.body.email 
            valueChanged = true
        }    
        
        // Only save change if a value is changed (prevent redundant db queries)
        if (valueChanged) {
            const a1 = await user.save()
            res.json(a1)
            console.log('Patch/Update Successful')
        } else {
            res.send('No Patch/Update: Values inputed identical to those in database')
            console.log('No Patch/Update: Values inputed identical to database')
        }

    } catch(err) {
        res.status(500).json({ message: 'Server Error' })
        console.error(err)
    }

})

// Handle Delete requests
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const a1 = await user.delete()
        res.send('User Deleted: \n' + a1)
        console.log('Delete Successful')
    } catch(err) {
        res.status(500).json({ message: 'Server Error' })
        console.error(err)

    }
})

module.exports = router
