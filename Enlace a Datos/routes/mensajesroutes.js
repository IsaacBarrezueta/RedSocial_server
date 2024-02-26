const express = require('express');
const router = express.Router();
const mensajeController = require('../../Logica de negocio/mensajescontrollers');

router.post('/mensaje', mensajeController.enviarmensaje);
router.get('/mensajes', mensajeController.obtenerMensajes);


module.exports = router;