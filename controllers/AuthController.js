const AuthModel = require('../models/Auth');
const validationResult = require('express-validator').validationResult;

exports.getRegister = (req, res, next) => {
    res.render('register', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Cadastre-se'
    });
};

exports.postRegister = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            await AuthModel.createNewUser(req.body.username, req.body.email, req.body.password);

            res.redirect('/login');
            
        } catch (err) {
            req.flash('authError', err.message || 'Erro desconhecido');
            res.redirect('/register');
        }
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/register');
    }
};

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash('authError')[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Login'
    });
};

exports.postLogin = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            const result = await AuthModel.login(req.body.email, req.body.password);

            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin;

            res.redirect('/');
        } catch (err) {
            req.flash('authError', err.message || 'Erro desconhecido');
            res.redirect('/login')
        }
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/login');
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};