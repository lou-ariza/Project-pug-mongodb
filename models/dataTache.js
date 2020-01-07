let mongoose = require('mongoose');

//schema
let tacheSchema = mongoose.Schema({
    tacheName:{
        type: String,
        required: true
    },
    listId:{
        type: String,
        required: true
    }
});

let Tache = module.exports = mongoose.model('Tache', tacheSchema);

