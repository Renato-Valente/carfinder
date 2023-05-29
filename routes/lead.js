const express = require('express');
const router = express.Router();
const leadServices = require('./../services/leadServices')

router.get('/', leadServices.getLeads);
router.get('/:id', leadServices.getLead);
router.post('/', leadServices.setLead);
router.patch('/:id', leadServices.updateLead);
router.delete('/:id', leadServices.deleteLead);


module.exports = router;