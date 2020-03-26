const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const connection = require('./database/connection');

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
const port = 3333;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
