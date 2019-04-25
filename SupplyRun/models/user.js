var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    companyName:String,
    companyNiche:String,
    phoneNumber:String,
    email:String,
    birth:String,
    adress:String,
    role:String,
    education:String,
    experience:String,
    accountType:Number,
    isProvider:{type:Boolean, default:false},
    isClient:{type:Boolean,default:false},
    isAdmin: {type:Boolean, default:false},
    jobs:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    }]
})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);