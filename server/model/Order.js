const mongoose = require("mongoose")

const schema = mongoose.Schema({
    orderId:String,
    items:[{
        name:String,
        id: String,
        c1: String,
        price: Number,
        quantity:String,
        icon: String,
        isActive: Boolean,
        des: String,
        o: Number,
    }],
    amount:Number,
    userDetail:{
        name:String,
        mobileNumber:String
    },
    userAddress:{
        name:String,
        house:String,
        street:String,
        area:String,
    },
    paymentMethod:String
    
})

module.exports = mongoose.model("Order", schema)