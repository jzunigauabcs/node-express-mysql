const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./db');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const alumnos = [];
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

const PORT = 3003;

app.listen(PORT, () => {
    console.log('Server connected....');
})