const mongoose = require('mongoose');

const replyCommentSchema = new mongoose.Schema({
    body:{
        type: String,
        trim: true,
        required: [true, 'A reply must have a body']
    },
    comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' },
    user:{ type:mongoose.Schema.ObjectId, ref: 'User' },
    
    createdAt:{
        type: Date,
        default: Date.now()
    }
},
{
   toObject: { virtuals:true },
   toJson: { virtuals: true } 
})