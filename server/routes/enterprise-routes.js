const express = require('express');
const router = express.Router();

const { getEnterprises, getEnterprise, createEnterprise, updateEnterprise,  deleteEnterprise} = require('../controllers/enterprise-controller');

router.get('/:lat/:long/:dist', getEnterprises);
router.get('/:id', getEnterprise);
router.post('/', createEnterprise);
router.put('/:id', updateEnterprise);
router.delete('/:id', deleteEnterprise);


module.exports = router;