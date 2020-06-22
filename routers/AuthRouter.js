const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check
const AuthGuard = require('./guards/AuthGuard');
const AuthController = require('../controllers/AuthController');

router.get('/register', AuthGuard.notAuth, AuthController.getRegister);

router.post(
    '/register', AuthGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check("username")
        .not()
        .isEmpty()
        .withMessage("O campo username é obrigatório"),
    check("email")
        .not()
        .isEmpty()
        .withMessage("O campo e-mail é obrigatório")
        .isEmail()
        .withMessage("Formato inválido"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password é obrigatório")
        .isLength({ min: 6 })
        .withMessage("A senha deve conter no mínimo 6 caracteres."),
    AuthController.postRegister

)
router.get('/login', AuthGuard.notAuth, AuthController.getLogin);

router.post(
    '/login', AuthGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check("email")
        .not()
        .isEmpty()
        .withMessage('O campo e-mail é obrigatório')
        .isEmail()
        .withMessage("Formato inválido"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Senha é obrigatória."),
    AuthController.postLogin

);

router.all('/logout', AuthGuard.isAuth, AuthController.logout)




module.exports = router;
