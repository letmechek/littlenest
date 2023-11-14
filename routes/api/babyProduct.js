const express = require('express');
const router = express.Router();
const babyProductCtrl = require('../../controllers/api/babyProducts')

router.get('/search', babyProductCtrl.search)
router.get('/', babyProductCtrl.index);
router.get('/model/:modelId', babyProductCtrl.getProductByCategory);
router.get('/:id', babyProductCtrl.show);

module.exports = router;