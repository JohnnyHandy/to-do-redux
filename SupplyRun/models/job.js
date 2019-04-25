var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var JobSchema = new mongoose.Schema({
    contractor:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        contractorName:String
    },
    createdAt:{type:Date, default:Date.now()},
    carrier:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        carrierName:String
    },
    description:String,
    product:String,
    quantity:String,
    expireTime:String,
    term:Date,
    delivery:{
        start:String,
        ending:String,
        machine:{
            id:{ type:mongoose.Schema.Types.ObjectId,
                 ref:"Machine"
               } 
        }
    }
    
})

JobSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Job", JobSchema);