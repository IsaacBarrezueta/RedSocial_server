const express = require('express');
const router = express.Router();
const userController = require('../../Logica de negocio/userscontrollers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/filtro', userController.filtrousers);
router.get('/usuario', userController.obtenerUsuarioPorId);

module.exports = router;