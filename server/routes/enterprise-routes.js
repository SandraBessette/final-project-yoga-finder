const express = require('express');
const router = express.Router();

const enterpriseController = require('../controllers/enterprise-controller');

router.get('/:lat/:long/:dist', enterpriseController.getEnterprises); // might want to put a post request, post filter metadata plu rest
router.get('/:id', enterpriseController.getEnterprise);
router.post('/', enterpriseController.createEnterprise);
router.put('/:id', enterpriseController.updateEnterprise);
router.delete('/:id', enterpriseController.deleteEnterprise);


module.exports = router;