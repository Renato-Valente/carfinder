const express = require('express');
const database = require('../utils/firebase');

const Userservices = require('../services/userServices');

const router = express.Router();

router.get('/', Userservices.getUsers);

router.get('/:id', Userservices.getUser);

router.post('/', Userservices.setUser);

router.delete('/:id', Userservices.deleteUser);

router.patch('/:id', Userservices.updateUser);

module.exports = router;