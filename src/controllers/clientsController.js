const { Client } = require('../db.js');


const getAllClients = async (req, res) => {

	try {
		const allClients = await Client.findAll();

		if(allClients) return res.send(allClients);

	} catch(e) {
		console.log({error:e});
	}

}

const createNewClient = async (req, res) => {
	
	try {
		await Client.create(req.body);
		return res.status(201).send({msg: 'new client successfully created'});
	} catch(e) {
		console.log({error:e})
	}

}

const updateClient = async (req, res) => {

	const { id } = req.params;
	const { name, contactName, email, address, country, city, postalCode } = req.body;

	try {
		await Client.update(
			{
			 name: name,
			 contactName: contactName,
			 email: email,
			 address: address,
			 country: country,
			 city: city,
			 postalCode: postalCode
			},
			{where: {id: id}}
		)

		return res.status(201).send({msg: 'client successfully updated'})

	} catch(e) {
		console.log({error:e});
	}

}

const deleteClient = (req, res) => {

	const { id } = req.params;

	try {
		await Client.destroy({
			where: { id: id }
		})

		return res.status(201).send({msg: 'client successfully deleted'})

	} catch(e) {
		console.log({error:e});
	}

}

module.exports = {
	getAllClients,
	createNewClient,
	updateClient,
	deleteClient
}