const router = require('express').Router();

const DetailProductController = require('../controllers/DetailProductController');

router.get('/', DetailProductController.getProduct);

router.get('/:id', DetailProductController.getProductById);

module.exports = router;