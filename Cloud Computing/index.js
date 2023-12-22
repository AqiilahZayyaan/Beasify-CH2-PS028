// index.js

const express = require('express');
const database = require('./database');
const router = express.Router();
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const middle = require('./middle');

router.get("/input", (_req, res) => {
    res.send('Hai, this is BEASIFY API !!');
  });

  router.post("/input", (req, res) => {
    const { nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL } = req.body;
    const userquery = 'INSERT INTO data_provider (nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const uservalues = [nik, nama, umur, universitas, jurusan, semester, IPK, TOEFL];

    database.query(userquery, uservalues, (err, rows, fields) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send({ message: err.sqlMessage });
        } else {
            res.send({ message: "Input Successful" });
        }
    });
});


const storage = new Storage({
    keyFilename: 'servicekey.json',
  });
  
  const bucketName = 'beasify_bucket';
  const bucket = storage.bucket(bucketName);
  
  const multerStorage = multer.memoryStorage();
  const upload = multer({ storage: multerStorage });
  
  router.get("/upload-file", (_req, res) => {
    res.send('Hai, this is BEASIFY API !!');
  });

  router.post('/upload-file', upload.single('beasifyfile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const { originalname, buffer } = req.file;
      const userId = req.user.id;
  
      const fileName = `${userId}_${Date.now()}_${originalname}`;
      const file = bucket.file(fileName);
  
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
  
      stream.on('error', (err) => {
        console.error('Error uploading to Google Cloud Storage:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      });
  
      stream.on('finish', async () => {
        const imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        return res.json({ message: 'Image uploaded successfully', imageUrl });
      });
  
      stream.end(buffer);
    } catch (error) {
      console.error('Error processing image upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
