const pool = require('../Enlace a Datos/database');

exports.solicitudamistad = async(req, res)=>{
    const {Usuarioid1, Usuarioid2} = req.body;
    const client = await pool.connect();
    try {
      const newamigo = await client.query('INSERT INTO Conexion (UsuarioID1, UsuarioID2, Estado) VALUES ($1, $2, $3) RETURNING *', [Usuarioid1, Usuarioid2, 'Pendiente']);
      client.release();
      res.status(201).json(newamigo.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

exports.obtenerAmigos = async (req, res) => {
    const { usuarioID } = req.query;
    const client = await pool.connect();
    try {
        const query = `
            SELECT u.*
            FROM Conexion c
            JOIN Usuario u ON (c.UsuarioID1 = u.UsuarioID OR c.UsuarioID2 = u.UsuarioID)
            WHERE (c.UsuarioID1 = $1 OR c.UsuarioID2 = $1) AND c.Estado = 'Activa';
        `;
        const result = await client.query(query, [usuarioID]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cambiarEstadoConexion = async (req, res) => {
    const { Usuarioid1, Usuarioid2, nuevoEstado } = req.body;
    try {
        const conexionid = await obtenerConexionEntreUsuarios(Usuarioid1, Usuarioid2); // Llama a la función de manera asincrónica
        if (conexionid === null) {
            return res.status(404).json({ message: "No se encontró conexión entre los usuarios" });
        }
        const client = await pool.connect();
        const query = `
            UPDATE Conexion
            SET Estado = $1
            WHERE conexionid = $2;
        `;
        const result = await client.query(query, [nuevoEstado, conexionid]);
        client.release();
        res.status(200).json({ message: "Estado de conexión actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


async function obtenerConexionEntreUsuarios(usuarioid1, usuarioid2)  {
    const client = await pool.connect();
    try {
        const query = `
            SELECT *
            FROM Conexion
            WHERE (UsuarioID1 = $1 AND UsuarioID2 = $2)
            OR (UsuarioID1 = $2 AND UsuarioID2 = $1);
        `;
        const result = await client.query(query, [usuarioid1, usuarioid2]);
        client.release();
        if (result.rows.length === 0) {
            return null;
        } else {
            return result.rows[0].conexionid;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerConexion = async(req, res) => {
    const {usuarioid1, usuarioid2} = req.query;
    const client = await pool.connect();
    try {
        const query = `
            SELECT *
            FROM Conexion
            WHERE (UsuarioID1 = $1 AND UsuarioID2 = $2)
            OR (UsuarioID1 = $2 AND UsuarioID2 = $1);
        `;
        const result = await client.query(query, [usuarioid1, usuarioid2]);
        client.release();
        if (result.rows.length === 0) {
            res.json({ estado: '' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


