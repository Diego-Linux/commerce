const ProductsModel = require('../models/Products');

exports.getProduct = async (req, res, next) => {
    try {
        const product = await ProductsModel.getFirstProduct();

        res.render('detailproduct', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Detalhes do Produto'
        });
    } catch (err) {
        res.redirect('/error');
    };
};

exports.getProductById = async (req, res, next) => {
    try {
        let id = req.params.id;

        const product = await ProductsModel.getProductById(id);

        res.render('detailproduct', {
            product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: product.name
        });
    } catch (err) {
        res.redirect('/error');
    };
};