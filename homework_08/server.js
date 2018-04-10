const express = require('express');
const app = express();
const router = require('./routes.js');
app.use('/', router.routes);

app.listen(3000, () => console.log('Listening on port 3000'));