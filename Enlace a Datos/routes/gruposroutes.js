const express = require('express');
const router = express.Router();
const grupoController = require('../../Logica de negocio/gruposcontrollers');

router.post('/grupo', grupoController.creargrupo);
router.get('/grupos', grupoController.obtenergrupos);
router.get('/usuariosgrupo', grupoController.obtenerpersonasrgrupo);

module.exports = router;