var mongoose = require("mongoose");
const Joi = require('@hapi/joi');
var productSchema = mongoose.Schema({
    name: String,
    productType: String,
    price: Number,
    available: Boolean,
});

var Product = mongoose.model("Product",productSchema);


function validateProduct(data)
{
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        productType: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),        
    })
    return schema.validate(data);
}
module.exports.Product = Product;
module.exports.validate = validateProduct;