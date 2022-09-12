const { Client } = require('../db.js');


const getAllClients = async (req, res) => {

	try {
		const allClients = await Client.findAll();
		if(allClients){
			return res.render('clients', {
				data: allClients
			})
		};


	} catch(e) {
		console.log({error:e});
	}

}

const createNewClient = async (req, res) => {
	console.log(req.body)
	try {
		await Client.create(req.body);
		return res.redirect('/clients')
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

		return res.redirect('/clients')

	} catch(e) {
		console.log({error:e});
	}

}

const deleteClient = async (req, res) => {

	const { id } = req.params;

	try {
		await Client.destroy({
			where: { id: id }
		})

		return res.redirect('/clients')

	} catch(e) {
		console.log({error:e});
	}

}

const getClientById = async (req, res) => {

	const { id } = req.params;

	try {
		
		const client = await Client.findByPk(id);
		if(client){
			return res.render('editClient', {
				data: client
			})
		} 

	} catch(e) {
		console.log({error:e});
	}

}

module.exports = {
	getAllClients,
	createNewClient,
	updateClient,
	deleteClient,
	getClientById
}