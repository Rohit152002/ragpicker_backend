import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    custname:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNumber:{
        type:Number,
        maxlength:10,
    },
    location:{
        address:String,
        city:String,
        state:String
    },
});

const Customer = mongoose.model("Customer" , customerSchema);

export default Customer;