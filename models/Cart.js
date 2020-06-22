const mongoose = require('mongoose');

const db = require('../db/connection');

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = async data => {
    try {
        await mongoose.connect(db);

        let item = new CartItem(data);

        await item.save();

        await mongoose.disconnect();

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getItemsByUser = async userId => {
    try {
        await mongoose.connect(db);

        const itemUser = await CartItem.find(
            { userId: userId },
            {},
            { sort: { timestamp: 1 } }
        );

        await mongoose.disconnect();

        return itemUser;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.editItem = async (id, newData) => {
    try {
        await mongoose.connect(db);

        const edit = await CartItem.updateOne({ _id: id }, newData);

        await mongoose.disconnect();

        return edit;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.deleteItem = async id => {
    try {
        await mongoose.connect(db);

        const itemDelete = await CartItem.findByIdAndDelete(id);

        await mongoose.disconnect();

        return itemDelete;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getItemById = async id => {
    try {
        await mongoose.connect(db);

        const itemId = await CartItem.findById(id);

        await mongoose.disconnect();

        return itemId;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};