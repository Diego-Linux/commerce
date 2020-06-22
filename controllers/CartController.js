const CartModel = require('../models/Cart');
const validationResult = require('express-validator').validationResult;

exports.getCart = async (req, res, next) => {
    try {
        const items = await CartModel.getItemsByUser(req.session.userId);

        res.render('cart', {
            items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: "Cart"
        });

    } catch (err) {
        res.redirect('/error');
    };
};

exports.postCart = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await CartModel.addNewItem({
                name: req.body.name,
                price: req.body.price,
                amount: req.body.amount,
                productId: req.body.productId,
                userId: req.session.userId,
                timestamp: Date.now()
            })

            res.redirect('/cart');

        } catch (err) {
            res.redirect('/error')
        }
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};

exports.postSave = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await CartModel.editItem(req.body.cartId, {
                amount: req.body.amount,
                timestamp: Date.now()
            });

            res.redirect('/cart');
        } catch (err) {
            res.redirect('/error');
        }
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/cart");
    };
};

exports.postDelete = async (req, res, next) => {
    try {
        await CartModel.deleteItem(req.body.cartId);

        res.redirect('/cart');

    } catch (err) {
        res.redirect('/error');
    };
};