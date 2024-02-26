const { Pool } = require('pg');

const pool = new Pool({
    host: 'pg-320656b6-caisaacbare-3270.a.aivencloud.com',
    port: '18664',
    user: 'avnadmin',
    password: 'AVNS_Idm0m4CmxDBhezLtrfF',
    database: 'RedSocial',
    sslmode: 'require',
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;
