const { number } = require("joi");
const mongooes = require("mongoose");
const productSchema = new mongooes.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

module.exports = mongooes.model("Products", productSchema);