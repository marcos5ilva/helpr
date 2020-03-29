const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const connection = require('./database/connection');

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

const port = 5555;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
