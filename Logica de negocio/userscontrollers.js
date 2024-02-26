const bcrypt = require('bcrypt');
const pool = require('../Enlace a Datos/database');

exports.register = async (req, res) => {
    const { Nombre, CorreoElectronico, Contraseña} = req.body;
    if (await correoRepetido(CorreoElectronico) == false) {
      try {
          const client = await pool.connect();
          const hashedPassword = await bcrypt.hash(Contraseña, 10);
          const result = await client.query('INSERT INTO Usuario (Nombre, CorreoElectronico, Contraseña) VALUES ($1, $2, $3)', [Nombre, CorreoElectronico, hashedPassword]);
          client.release();
          if (result.rowCount > 0) {
            res.status(200).json({ message: 'Usuario registrado Correctamente' });
          } else {
            res.status(400).json({ message: 'No se registro el usuario' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'Correo repetido' });
    }
};



exports.login = async (req, res) => {
    const { CorreoElectronico, Contraseña } = req.body;
    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM Usuario WHERE CorreoElectronico = $1', [CorreoElectronico]);
        client.release();
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        const isValidPassword = await bcrypt.compare(Contraseña, user.rows[0].contraseña);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filtrousers = async(req, res) =>{
    const { name } = req.query;
    const client = await pool.connect();
    let query = 'SELECT * FROM Usuario';
    if (name) {
      query += ` WHERE nombre ILIKE '%${name}%'`;
    }
    client.query(query, (error, results) => {
      client.release();
      if (error) {
        res.status(500).json({ error: 'An error occurred while fetching the users' });
      } else {
        res.json(results.rows);
      }
    });
  };


  async function correoRepetido(correo) {
    const query = "SELECT * FROM Usuario where correoelectronico=$1";
    try {
        const client = await pool.connect();
        const result = await client.query(query, [correo]);
        client.release();
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("Error en la conexión con la BD");
    }
  }

  exports.obtenerUsuarioPorId = async (req, res) => {
    const { usuarioid } = req.query;
    const client = await pool.connect();
    try {
        const query = `
            SELECT *
            FROM Usuario
            WHERE UsuarioID = $1;
        `;
        const result = await client.query(query, [usuarioid]);
        client.release();
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No se encontró el usuario" });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
