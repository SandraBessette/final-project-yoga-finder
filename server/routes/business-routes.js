const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const businessController = require('../controllers/business-controller');

router.get('/:lat/:long/:dist', businessController.getBusiness); // might want to put a post request, post filter metadata plu rest
router.get('/filters/metadata', businessController.getMetadata);
router.get('/:id', businessController.getSingleBusiness);
router.post('/', auth, businessController.createBusiness);
router.post('/filters', businessController.getFilteredBusiness);
router.put('/:id', auth, businessController.updateBusiness);
router.delete('/:id', auth, businessController.deleteBusiness);


module.exports = router;