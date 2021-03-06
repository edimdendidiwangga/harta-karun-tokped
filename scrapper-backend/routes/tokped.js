const router = require('express').Router();
const tokpedController = require('../controllers/tokped')

router.get('/',  tokpedController.products)
router.get('/detail', tokpedController.detailProduct)
router.get('/variant', tokpedController.variant)
router.get('/csvBL', tokpedController.csvBL)

module.exports = router;