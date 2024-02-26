const express = require('express');
const router = express.Router();
const notificacionController = require('../../Logica de negocio/notificacionescontrollers');

router.post('/notificacion', notificacionController.createnotificacion);
router.get('/notificaciones', notificacionController.obtenernotificaciones);

module.exports = router;