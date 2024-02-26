const pool = require('../Enlace a Datos/database');

exports.createnotificacion = async(req, res)=>{
    const {Usuarioid, Contenido, Usuarioid2} = req.body;
    const client = await pool.connect();
    try {
      const result = await client.query('INSERT INTO Notificacion (UsuarioID, Contenido, UsuarioID2) VALUES ($1, $2, $3)', [Usuarioid, Contenido, Usuarioid2]);
      client.release();
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Notificacion creada con exito' });
      } else {
        res.status(400).json({ message: 'No se creo la notificacion' });
      }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

exports.obtenernotificaciones = async (req, res) => {
    const { usuarioID } = req.query;
    const client = await pool.connect();
    try {
        const query = `
            SELECT * FROM Notificacion WHERE UsuarioID = $1;
        `;
        const result = await client.query(query, [usuarioID]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
