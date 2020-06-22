const mongoose = require('mongoose');

const CartModel = require('./Cart');

const db = require('../db/connection');

const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number,
    address: String,
    recheio: String,
    status: {
        type: String,
        default: "pending"
    },
    timestamp: Number
});

const Order = mongoose.model('order', orderSchema);

exports.addNewOrder = async data => {
    try {
        await CartModel.deleteItem(data.cartId);

        await mongoose.connect(db);

        data.timestamp = await Date.now();

        let order = await new Order(data);

        await order.save();

        await mongoose.disconnect();


    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getOrdersByUser = async userId => {
    try {
        await mongoose.connect(db);

        const items = await Order.find(
            { userId: userId },
            {},
            { sort: { timestamp: 1 } }
        );

        await mongoose.disconnect();

        return items;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.cancelOrder = async id => {
    try {
        await mongoose.connect(db);

        await Order.findByIdAndDelete(id);

        await mongoose.disconnect();


    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.getAllOrders = async () => {
    try {
        await mongoose.connect(db);

        const items = await Order.find({}, {}, { sort: { timestamp: 1 } });

        await mongoose.disconnect();

        return items;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};

exports.editOrder = async (id, newStatus) => {
    try {
        await mongoose.connect(db);

        const items = await Order.updateOne({ _id: id }, { status: newStatus });

        await mongoose.disconnect();

        return items;

    } catch (err) {

        await mongoose.disconnect();

        console.log(err);
    };
};