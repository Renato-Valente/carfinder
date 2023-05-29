const express = require('express');

const router = express.Router();
const vender_carroServices = require('./../services/vender_carroServices');

router.get('/', vender_carroServices.getVender_carros);
router.get('/:id', vender_carroServices.getVender_carro);
router.post('/', vender_carroServices.setVender_carro);
router.patch('/:id', vender_carroServices.updateVender_carro);
router.delete('/:id', vender_carroServices.deleteVender_carro);



module.exports = router;