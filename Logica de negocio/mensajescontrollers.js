const pool = require('../Enlace a Datos/database');


exports.enviarmensaje = async(req, res)=>{
    const {emisor, receptor, contenido} = req.body;
    const client = await pool.connect();
    try {
      const newmensaje = await client.query('INSERT INTO Mensaje (Emisorid, Receptorid, Contenido) VALUES ($1, $2, $3) RETURNING *', [emisor, receptor, contenido]);
      client.release();
      res.status(201),json(newmensaje[0]);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
};

exports.obtenerMensajes = async (req, res) => {
    const { usuarioID } = req.body;
    const client = await pool.connect();
    try {
        const query = `
            SELECT * FROM Mensaje WHERE EmisorID = $1 OR ReceptorID = $1
        `;
        const result = await client.query(query, [usuarioID]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};