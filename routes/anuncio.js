const express = require('express');
const router = express.Router();
const anuncioServices = require('./../services/anuncioServices');

router.get('/', anuncioServices.getAnuncios);
router.get('/:id', anuncioServices.getAnuncio);
router.post('/', anuncioServices.setAnuncio);
router.patch('/:id', anuncioServices.updateAnuncio);
router.delete('/:id', anuncioServices.deleteAnuncio);


module.exports = router;