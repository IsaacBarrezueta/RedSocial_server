const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Enlace a Datos/routes/usersroutes');
const grupoRoutes = require('./Enlace a Datos/routes/gruposroutes');
const amigosRoutes = require('./Enlace a Datos/routes/amigosroutes');
const mensajesRoutes = require('./Enlace a Datos/routes/mensajesroutes');
const notificacionesRoutes = require('./Enlace a Datos/routes/notificacionesroutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', grupoRoutes);
app.use('/api', amigosRoutes);
app.use('/api', mensajesRoutes);
app.use('/api', notificacionesRoutes);
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});