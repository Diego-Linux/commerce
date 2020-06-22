const mongoose = require('mongoose');
const db = require('../db/connection');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});

const Product = mongoose.model('product', productSchema);

exports.addNewProduct = async (data) => {
    try {
        await mongoose.connect(db);

        const newProduct = await new Product(data);

        await newProduct.save();

        await mongoose.disconnect();

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getAllProducts = async () => {
    try {
        await mongoose.connect(db);

        const productFind = await Product.find({});

        await mongoose.disconnect();

        return productFind;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getProductsByCategory = async (category) => {
    try {
        await mongoose.connect(db);

        const productFind = await Product.find({ category: category });

        await mongoose.disconnect();

        return productFind;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getProductById = async (id) => {
    try {
        await mongoose.connect(db);

        const productId = await Product.findById(id);

        await mongoose.disconnect();

        return productId;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getFirstProduct = async () => {
    try {
        await mongoose.connect(db);

        const firstProduct = await Product.findOne({});

        await mongoose.disconnect();

        return firstProduct;

    } catch (err) {
        await mongoose.disconnect();
        console.log(err);
    };
};