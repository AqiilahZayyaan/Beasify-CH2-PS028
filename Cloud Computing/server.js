// server.js
const express = require('express');

const routes = require('./index');

const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('Hai, this is BEASIFY API !!');
  });

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});