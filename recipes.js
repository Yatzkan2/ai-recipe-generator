const mongoose = require('mongoose')

const recipeScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    ingredients: {
        type: [String]
    }, 
    isntructions: {
        type: [String]
    }
})

const Product = new mongoose.model('Products', productScehma)
module.exports = Product;