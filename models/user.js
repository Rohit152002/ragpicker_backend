import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    adharNumber:{
        type:Number,
        maxlength:12,
    },
    phoneNumber:{
        type:Number,
        maxlength:10,
    },
    location:{
        address:String,
        state:String,
        city:String
    },
    join:{
        type:Date,
    }
});

const User = mongoose.model("User" , userSchema);

export default User;