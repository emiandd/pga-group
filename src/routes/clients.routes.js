const { Router } = require('express');
const router = Router();
const clientsController = require('../controllers/clientsController.js');
const clientsMiddleware = require('../middleware/clientsMiddleware.js');
const updateClientMiddleware =  require('../middleware/updateClientMiddleware.js');

router
	.get('/clients', clientsController.getAllClients)
	.post('/clients', clientsMiddleware.newClient, clientsController.createNewClient)
	.post('/clients/:id', updateClientMiddleware, clientsController.updateClient)
	.get('/clients/:id', clientsController.deleteClient)
	.get('/client/:id', clientsController.getClientById)



module.exports = router;