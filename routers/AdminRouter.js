const router = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer');
const bodyParser = require('body-parser');

const adminController = require('../controllers/AdminController');
const adminGuard = require('./guards/AdminGuard');

router.get("/add", adminGuard, adminController.getAdd);

router.post(
    "/add",
    adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images/");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single("image"),
    check("name")
        .not()
        .isEmpty()
        .withMessage("Nome é requerido"),
    check("price")
        .not()
        .isEmpty()
        .withMessage("Preço é requerido")
        .isFloat({ min: 0.0000000009 })
        .withMessage("Preço deve ser maior que 0,00"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("Descrição é necessária"),
    check("category")
        .not()
        .isEmpty()
        .withMessage("Defina uma categoria"),
    check("image").custom((value, { req }) => {
        if (req.file) return true;
        else throw "Imagem é requerida";
    }),
    adminController.postAdd
);

router.get('/orders', adminGuard, adminController.getOrders) /

    router.post(
        '/orders',
        adminGuard,
        bodyParser.urlencoded({ extended: true }),
        adminController.postOrders
    );

module.exports = router;