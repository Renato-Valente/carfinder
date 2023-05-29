const express = require('express');



const router = express.Router();
const encomendaService = require('../services/encomendaServices');


router.get('/', encomendaService.getEncomendas);
router.get('/:id', encomendaService.getEncomenda);
router.post('/', encomendaService.setEncomenda);
router.patch('/:id', encomendaService.updateEncomenda);
router.delete('/:id', encomendaService.deleteEncomenda);


module.exports = router;