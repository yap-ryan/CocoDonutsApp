const express = require('express')
const router = express.Router()

// Importing Item model 
const Item = require('../models/item')

// All requests should be async to prevent process blocking
// Handle Get requests for ALL items
router.get('/', async (req,res) => {
    try{
        const items = await Item.find()
        res.json(items)
        console.log('Get (all items) Success')

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }
})

// Handle post requests (Post new Item to db)
router.post('/', async(req,res) => {

    let {name, imgSrc, type, pointCost} = req.body

    // Make sure item name is unique
    try{
        const item = await Item.findOne({name})
        if (item) {
            res.json({
                status: 'ERROR', message: 'Item already exists with name: ' + name 
            })
            console.log('Item already exists with name: ' + name)
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Server Error' })
        console.error(err)
    }

    const newItem = new Item(
        {
            name: name,
            imgSrc: imgSrc,
            type: type,
            pointCost: pointCost
        }
    )

    // Save new item to db
    try{    
        const result = await newItem.save()

        res.json({
            status: 'SUCCESS',
            message: 'Successfully added new item',
            data: result
        })
        console.log('Add New Item Success')
    } catch(err){
        res.json({
            status: 'ERROR', 
            message: 'Could not save new item to db' 
        })
        console.error(err)                
    }
})

router.patch('/:id', async (req,res) => {

    let {name, imgSrc, pointCost} = req.body

    try {
        const item = await Item.findById(req.params.id)

        item.name = name
        item.imgSrc = imgSrc
        item.pointCost = pointCost

        try{
            const result = await item.save()

            res.json({
                status: 'SUCCESS',
                message: 'Update successful',
                data: result
            })
            console.log('Update Successful')

        } catch(err) {
            res.json({
                status: 'ERROR', message: 'Could not update item' })
            console.error(err)
        }

    } catch(err) {
        res.json({
            status: 'ERROR', message: 'Could not find item' })
        console.error(err)
    }

})

module.exports = router
