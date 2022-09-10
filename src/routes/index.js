const { Router } = require('express');
const router = Router();
const clients = require('./clients.routes.js');


router.use('/', clients);


module.exports = router;