const { Client } = require('../db.js');

const newClient = async (req, res, next) => {

	const { name, contactName, email, address, country, city, postalCode } = req.body;
	
	if(!name || 
	   !contactName || 
	   !email || 
	   !address || 
	   !country || 
	   !city || 
	   !postalCode){
		return res.status(400).send({error: 'missing information'});
	}

	const client = await Client.findOne({
		where: { email: email }
	});

	if(client) return res.status(409).send({error:'already exists a client with this email'})

	next();

}

const updateClient = async (req, res, next) => {

	const { name, contactName, email, address, country, city, postalCode } = req.body;

	if(!name || 
	   !contactName || 
	   !email || 
	   !address || 
	   !country || 
	   !city || 
	   !postalCode){
		return res.status(400).send({error: 'missing information for client update'});
	}

	next();

}

const deleteClient = async (req, res, next) => {

	const { id } = req.params;

	const client = await Client.findByPk(id);

	if(!client){
		return res.status(404).send({error:'the user that you want delete not exists'})
	}

	next();

}

module.exports = {
	newClient,
	updateClient,
	deleteClient
}