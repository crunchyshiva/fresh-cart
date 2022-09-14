const express = require('express');
const app = express.Router();

require('../db/conn');
const Order = require('../model/Order');


app.post('/order', (req, res) => {

    const data = new Order({
        orderId:`fk_${Math.random() * 100}`,
        items:req.body.items,
        amount:req.body.amount,
        userDetail:{
            name:req.body.userDetail.name,
            mobileNumber:req.body.userDetail.mobileNumber
        },
        userAddress:{
            name:req.body.userAddress.name,
            house:req.body.userAddress.house,
            street:req.body.userAddress.street,
            area:req.body.userAddress.area
        },
        paymentMethod:"Cah-on-delivery"
    })
    try{
        const dataToSave = data.save();
        return res.status(200).json(dataToSave)
        console.log(req.body,'req')
    }
    catch(error){
        return  res.status(400).json({message: error.message})
    }
    res.send('Post API')
})



module.exports = app;