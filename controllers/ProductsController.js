const ProductsModel = require("../models/Products");

exports.getProducts = async (req, res, next) => {
    const category = req.query.category;
    const validCategories = ["bombom", "barra", "ovo", "trufa", "brownie"];
    let products;

    category && validCategories.includes(category)
        ? products = await ProductsModel.getProductsByCategory(category)
        : products = await ProductsModel.getAllProducts();

    res.render("products", {
        products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationError: req.flash("validationErrors")[0],
        pageTitle: "Products"
    });
};
