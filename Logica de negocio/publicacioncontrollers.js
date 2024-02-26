const bcrypt = require('bcrypt');
const pool = require('../Enlace a Datos/database');


// Publicar una nueva publicación
exports.publicar = async(req, res) => {
    const { UsuarioID, Contenido, FechaPublicacion } = req.body;
    try {
        const newPost = await pool.query('INSERT INTO Publicacion (UsuarioID, Contenido, FechaPublicacion) VALUES ($1, $2, $3) RETURNING *', [UsuarioID, Contenido, FechaPublicacion]);
        res.status(201).json(newPost.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las publicaciones
exports.obtenerTodasPublicaciones = async(req, res) => {
    try {
        const publicaciones = await pool.query('SELECT * FROM Publicacion');
        res.status(200).json(publicaciones.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.agregarComentario = async(req, res) => {
    try {
        const { publicacionId, correo, contenido } = req.body;
        // Realizar la inserción del comentario en la base de datos
        const nuevoComentario = await pool.query(
            'INSERT INTO Comentario (PublicacionID, Correo, Contenido) VALUES ($1, $2, $3) RETURNING *', [publicacionId, correo, contenido]
        );
        res.status(201).json(nuevoComentario.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.obtenerComentariosPorPublicacion = async(req, res) => {
    try {
        const { publicacionId } = req.params;
        // Obtener todos los comentarios asociados a una publicación específica
        const comentarios = await pool.query(
            'SELECT * FROM Comentario WHERE PublicacionID = $1', [publicacionId]
        );
        res.status(200).json(comentarios.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};