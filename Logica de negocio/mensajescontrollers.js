const pool = require('../Enlace a Datos/database');


exports.enviarmensaje = async(req, res)=>{
    const {emisor, receptor, contenido} = req.body;
    const client = await pool.connect();
    try {
      const newmensaje = await client.query('INSERT INTO Mensaje (Emisorid, Receptorid, Contenido) VALUES ($1, $2, $3)', [emisor, receptor, contenido]);
      client.release();
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({error: error.message});
    }
};

exports.obtenerMensajes = async (req, res) => {
    const { emisor, receptor} = req.query;
    const client = await pool.connect();
    try {
        const query = `
            SELECT * FROM Mensaje WHERE (EmisorID = $1 AND ReceptorID = $2) OR (ReceptorID = $1 AND EmisorID = $2)
        `;
        const result = await client.query(query, [emisor,receptor]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};