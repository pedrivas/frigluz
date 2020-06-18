const express = require('express');
const userController = require('./controllers/usersController');
const productController = require('./controllers/productController');
const customerController = require('./controllers/customerController');
const supplierController = require('./controllers/supplierController');
const entryController = require('./controllers/entryController');
const outputController = require('./controllers/outputController');
const stockController = require('./controllers/stockController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

routes.get('/product', productController.index);
routes.post('/product', productController.create);
routes.put('/product/:id', productController.update);
routes.delete('/product/:id', productController.delete);

routes.get('/customer', customerController.index);
routes.post('/customer', customerController.create);
routes.put('/customer/:id', customerController.update);
routes.delete('/customer/:id', customerController.delete);

routes.get('/supplier', supplierController.index);
routes.post('/supplier', supplierController.create);
routes.put('/supplier/:id', supplierController.update);
routes.delete('/supplier/:id', supplierController.delete);

routes.get('/entry', entryController.index);
routes.get('/entryGroupLote', entryController.indexGroupLote);
routes.get('/entryMaxLote', entryController.indexMaxLote);
routes.post('/entry', entryController.create);
routes.put('/entry/:id', entryController.update);
routes.put('/entry', entryController.updateLote);
routes.delete('/entry/:id', entryController.delete);
routes.delete('/entry', entryController.deleteLote);

routes.get('/output', outputController.index);
routes.get('/outputGroupPedido', outputController.indexGroupPedido);
routes.get('/outputMaxPedido', outputController.indexMaxPedido);
routes.post('/output', outputController.create);
routes.put('/output/:id', outputController.update);
routes.put('/output', outputController.updatePedido);
routes.delete('/output/:id', outputController.delete);
routes.delete('/output', outputController.deletePedido);

routes.get('/stock/:product', stockController.getStock);

routes.post('/session', sessionController.create);

module.exports = routes;