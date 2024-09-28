const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    dob:{
        type:Date,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        match:/^\d{10}$/,
    },
    profilePicture:{
        type:Buffer,
    },
    lastLogin:{
        type:Date,
        default:null,
    }
},{timestamps:true}
)

module.exports = mongoose.model('User',userSchema)