const mysql = require('mysql2/promise');

async function connect() {
    try {
        const conn = await mysql.createConnection({
            host: '0.0.0.0',
            port: 33006,
            user: 'root',
            password: 'my-t00r',
            database: 'CONTROL_ESCOLAR'
        });
        console.log('conexión a la bd establecida');
        return conn;
    } catch(err) {
        console.error('Ocurrió un error al realizar la conexión a la bd: ', err);
        throw err;
    }
}

module.exports = connect;