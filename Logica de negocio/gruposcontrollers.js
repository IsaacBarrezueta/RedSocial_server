const pool = require('../Enlace a Datos/database');


exports.creargrupo = async (req, res) =>{
    const {nombre, descripcion} = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO Grupo (Nombre, Descripcion) VALUES ($1, $2)', [nombre, descripcion]);
        client.release();
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Grupo creado exitosamente' });
        } else {
            res.status(400).json({ message: 'No se creo el grupo'});
        }   
    } catch(error){
        res.status(500).json({ error: error.message });
    } 
};

exports.obtenergrupos = async (req, res) =>{
    const {usuarioid} = req.body;
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT g.* FROM GrupoUsuario gu JOIN Grupo g ON gu.GrupoID = g.GrupoID WHERE gu.UsuarioID = $1;', [usuarioid]);
        client.release();
        res.json(result.rows);
    } catch(error){
        res.status(500).json({ error: error.message });
    } 
};

exports.obtenerpersonasrgrupo = async (req, res) =>{
    const {grupoid} = req.body;
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT u.* FROM GrupoUsuario gu JOIN Usuario u ON gu.UsuarioID = u.UsuarioID WHERE gu.GrupoID = $1;', [grupoid]);
        client.release();
        res.json(result.rows);
    } catch(error){
        res.status(500).json({ error: error.message });
    } 
};
