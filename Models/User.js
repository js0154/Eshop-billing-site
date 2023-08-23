const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    addressL1: {
        type: String,
        default: ''
    },
    addressL2: {
        type: String,
        default: ''
    },
    areapin :{
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema);