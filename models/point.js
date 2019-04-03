const mongoose = require('mongoose');


const POintSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    latitude: Number,
    logtitude: Number,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    comments: [{
        text: string,
        createdAt: {
            type: Date,
            default: Date.now
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    }]
}, {
    timestamps: true
});


module.exports =  mongoose.model("Point", POintSchema);