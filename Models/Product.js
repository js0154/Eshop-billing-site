const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const productSchema= new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
    }],
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    totalreviews: {
        type: Number,
        default: 0,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Product', productSchema);