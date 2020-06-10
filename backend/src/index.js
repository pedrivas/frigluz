const express = require('express');
const cors = require('cors'); //modulo de seguranca
const routes = require('./routes');

const app = express();

app.use(cors()); // adicionar o parametro origin, que define o endereco eprmitido a acessar a aplicacao
app.use(express.json());
app.use(routes);

app.listen(3333);