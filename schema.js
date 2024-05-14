let mongoose = require('mongoose');


let Contactus = mongoose.Schema({
    name: String,
    mobilenumber:String,
    email:String
})
module.exports = mongoose.model('Contactus', Contactus);