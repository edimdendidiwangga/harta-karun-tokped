const router = require('express').Router();
const tokpedController = require('../controllers/tokped')

router.get('/',  tokpedController.detailProduct)

module.exports = router;