const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');
const connection = require('./database/connection');

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

const port = 5555;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
