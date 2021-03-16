const mongoose = require ('mongoose')

const reportSchema = new mongoose.Schema({
    
    createdByDoctor:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum : ['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit']
    },
    date:{
        type:Date,
        default:Date.now
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }
})

const Report= mongoose.model('Report', reportSchema)

module.exports = Report