const router = require('express').Router();
const ProductsController = require('../controllers/ProductsController');

router.get('/products', ProductsController.getProducts);

module.exports = router;

