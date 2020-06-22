const CartModel = require("../models/Cart");
const OrderModel = require("../models/Orders");

const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = async (req, res, next) => {
    try {
        const cartItem = await CartModel.getItemById(req.query.order)

        res.render("verify-order", {
            cart: cartItem,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: "Verificar pedido",
            validationError: req.flash("validationErrors")[0]
        });
    }
    catch (err) {
        res.redirect("/error");
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const items = await OrderModel.getOrdersByUser(req.session.userId);

        res.render("orders", {
            pageTitle: "Pedidos",
            isUser: true,
            isAdmin: req.session.isAdmin,
            items: items
        });

    } catch (err) {
        res.redirect("/error")
    };
};

exports.postOrder = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await OrderModel.addNewOrder(req.body)

            res.redirect("/orders");
        } catch (err) {
            res.redirect("/error");
        };
    }
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/verify-order?order=" + req.body.cartId);
    }
};

exports.postCancel = async (req, res, next) => {
    try {
        await OrderModel.cancelOrder(req.body.orderId);

        res.redirect("/orders");

    } catch (err) {
        res.redirect("/error");
    };
};
