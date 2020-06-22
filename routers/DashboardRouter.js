const router = require('express').Router();
const DashboardController = require('../controllers/DashboardController');

router.get('/',DashboardController.getDashboard);

module.exports = router;


