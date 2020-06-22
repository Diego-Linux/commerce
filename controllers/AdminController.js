const ProductsModel = require("../models/Products");
const OrdersModel = require('../models/Orders');
const validationResult = require("express-validator").validationResult;

exports.getAdd = (req, res, next) => {
    res.render("add-product", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        productAdded: req.flash("added")[0],
        pageTitle: "Adicionar produto"
    });
};

exports.postAdd = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            req.body.image = req.file.filename;
            await ProductsModel.addNewProduct(req.body)

            req.flash("added", true);
            res.redirect("/admin/add");

        }
        catch (err) {
            res.redirect("/error");
        };
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/admin/add");
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const items = await OrdersModel.getAllOrders()

        res.render('manage-orders', {
            pageTitle: 'Manage Orders',
            isUser: true,
            isAdmin: true,
            items
        });
    } catch (err) {
        res.redirect('/error');
    };
};

exports.postOrders = async (req, res, next) => {
    try {
        await OrdersModel.editOrder(req.body.orderId, req.body.status);

        res.redirect('/admin/orders')

    } catch (err) {
        res.redirect('/error');
    };
};