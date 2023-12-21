const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: '34.101.36.126',
    user: 'root',
    database: 'excel_beasify',
    password: 'zxq288fm58'
});

router.post("/test", (req, res) => {
    const { nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL } = req.body;

    const query = "INSERT INTO data_provider (nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL) VALUES (nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL)";

    connection.query(query, [nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL], (err, rows, fields) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.send({message: "Registration Successful"});
        }
    });
});

app.use('/', router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});