require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./db');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/alumnos', async (req, res) => {
    let db;
    try {
        db = await connect();
        const query = "SELECT * FROM alumnos";
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.get('/alumnos/:no_control', async (req, res) => {
    let db;
    try {
        const noControl = req.params.no_control;
        db = await connect();
        const query = `SELECT * FROM alumnos WHERE no_control=${noControl}`;
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.delete('/alumnos/:no_control', async (req, res) => {
    let db;
    try {
        const noControl = req.params.no_control;
        db = await connect();
        //const query = `DELETE FROM alumnos WHERE no_control=${noControl}`;
        const query = `CALL SP_REMOVE_ALUMNO(${noControl})`;
        const [rows] = await db.execute(query);
        if(rows.affectedRows === 0) {
            res.json({
                data: {},
                msg: 'El valor no fue encontrado',
                status: 404
            });
        } else {
            res.json({
                data: {},
                msg: 'Dato eliminado correctamente',
                status: 200
            });
        }
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.post('/alumnos', async (req, res) =>{
    let db;
    try {
        const { no_control, nombre, apellidos } = req.body;
         
        db = await connect();
        const query = `CALL SP_CREATE_ALUMNO(${no_control},${nombre}, ${apellidos})`;
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

app.put('/alumnos/:no_control', async (req, res) => {
    let db;
    try {
        const { nombre, apellidos } = req.body;
        const noControl = req.params.no_control;
        db = await connect();
        const query = `UPDATE alumnos SET nombre='${nombre}', apellidos='${apellidos}' WHERE  no_control=${noControl}`;
        const [rows] = await db.execute(query);
        console.log(rows);

        res.json({
            data: rows,
            status: 200
        });
    } catch(err) {
        console.error(err);
    } finally {
        if(db)
            db.end();
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server connected....' + PORT);
});