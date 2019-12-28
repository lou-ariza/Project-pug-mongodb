let mongoose = require('mongoose');

//schema
let userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);

