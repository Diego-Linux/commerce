const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const AuthGuard = require('./guards/AuthGuard');

const CartController = require('../controllers/CartController');

router.get('/', AuthGuard.isAuth, CartController.getCart);

router.post(
    "/",
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("Quantidade é requerida")
        .isInt({ min: 1 })
        .withMessage("Quantidade deve ser maior que zero"),
    CartController.postCart
);

router.post(
    "/save",
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("Quantidade é requerida")
        .isInt({ min: 1 })
        .withMessage("Quantidade deve ser maior que zero"),
    CartController.postSave
);

router.post(
    "/delete",
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    CartController.postDelete
);

module.exports = router;