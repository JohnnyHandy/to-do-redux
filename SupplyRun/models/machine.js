var mongoose = require("mongoose");

var MachineSchema = new mongoose.Schema({
    isTruck:Boolean,
    isCar:Boolean,
    isFork:Boolean,
    isOther:Boolean,
    model:String,
    manufacturer:String,
    operationStart:{type:Date, default: Date.now},
    operationEnd:String,
    plate:String,
    currentDriver:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    
    },
    currentJob:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    }
}) 


module.exports = mongoose.model("Machine", MachineSchema);