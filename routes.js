const routes = require('express').Router();

const AuthRouter = require('./routers/AuthRouter');
const DashboardRouter = require('./routers/DashboardRouter');
const ProductsRouter = require('./routers/ProductsRouter');
const AdminRouter = require('./routers/AdminRouter');
const CartRouter = require('./routers/CartRouter');
const OrderRouter = require('./routers/OrdersRouter');
const DetailProductRouter = require('./routers/DetailProductRouter');

routes.use('/', DashboardRouter);
routes.use('/', AuthRouter);
routes.use('/admin', AdminRouter);
routes.use('/', ProductsRouter);
routes.use('/cart', CartRouter);
routes.use('/', OrderRouter);
routes.use('/product', DetailProductRouter);

routes.get("/error", (req, res, next) => {
    res.status(500);
    res.render("error.ejs", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Error"
    });
});


routes.get("/not-admin", (req, res, next) => {
    res.status(403);
    res.render("not-admin", {
        isUser: req.session.userId,
        isAdmin: false,
        pageTitle: "Not Allowed"
    });
});

routes.use((req, res, next) => {
    res.status(404);
    res.render("not-found", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Page Not Found"
    });
});

module.exports = routes;