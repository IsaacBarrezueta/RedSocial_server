const express = require('express');
const router = express.Router();
const amigosController = require('../../Logica de negocio/amigoscontrollers');

router.post('/solicitud', amigosController.solicitudamistad);
router.get('/amigos', amigosController.obtenerAmigos);
router.put('/estado', amigosController.cambiarEstadoConexion);
router.get('/conexion', amigosController.obtenerConexion);

module.exports = router;