const express = require('express');
const router = express.Router();
const userController = require('../../Logica de negocio/userscontrollers');
const publicacioncontrollers = require('../../Logica de negocio/publicacioncontrollers');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/filtro', userController.filtrousers);
router.get('/usuario', userController.obtenerUsuarioPorId);

router.get('/usuarios', userController.obtenerUsuarios);

router.post('/publicar', publicacioncontrollers.publicar);
router.get('/publicaciones', publicacioncontrollers.obtenerTodasPublicaciones);
router.post('/publicar', publicacioncontrollers.publicar);

module.exports = router;