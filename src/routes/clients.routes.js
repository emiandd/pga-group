const { Router } = require('express');
const router = Router();
const clientsController = require('../controllers/clientsController.js');
const clientsMiddleware = require('../middleware/clientsMiddleware.js');

router
	.get('/clients', clientsController.getAllClients)
	.post('/clients', clientsMiddleware.newClient, clientsController.createNewClient)
	.put('/clients/:id', clientsMiddleware.updateClient, clientsController.updateClient)
	.get('/clients/:id', clientsMiddleware.deleteClient, clientsController.deleteClient)
	.get('/client/:id', clientsController.getClientById)


module.exports = router;