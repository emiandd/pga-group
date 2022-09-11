const request = require('supertest');
const baseUrl = 'http://localhost:3001';
const clients = require('../helpers/client.js');

describe('POST /clients', () => {

	it('should return 400 status code', async () => {
		const client = clients[0];
		delete client.city;
		const response = await request(baseUrl).post('/clients').send(client);
		expect(response.statusCode).toBe(400);
	})

	it('should return "missing information" error ', async () => {
		const client = clients[1];
		delete client.postalCode;
		const response = await request(baseUrl).post('/clients').send(client);
		expect(response.body.error).toBe('missing information');
		expect(response.body.msg).toBe(undefined);
	})

	it('should return 201 status code', async () => {
		const response = await request(baseUrl).post('/clients').send(clients[2]);
		expect(response.statusCode).toBe(201);
	})

	it('should return "new client successfully created" msg', async () => {
		const response = await request(baseUrl).post('/clients').send(clients[3]);
		expect(response.body.msg).toBe('new client successfully created');
	})

	it('should return 409 status code if already exists a client registered with this email', async () => {
		const response = await request(baseUrl).post('/clients').send(clients[2]);
		expect(response.statusCode).toBe(409);
		expect(response.body.error).toBe('already exists a client with this email');
	})

})

describe('GET /clients', () => {

	it('should return 200 status code', async () => {
		const response = await request(baseUrl).get('/clients');
		expect(response.statusCode).toBe(200);
	})

	it('should return an array with all clients', async () => {
		const response = await request(baseUrl).get('/clients');
		expect(response.body.length).toBeGreaterThan(0);
	})

})

describe('PUT /clients/:id', () => {
	
	it('should return 400 status code', async () => {
		const allClients = await request(baseUrl).get('/clients');
		client = allClients.body[0]	
		delete client.postalCode
		const response = await request(baseUrl).put(`/clients/${client.id}`).send(client)
		expect(response.statusCode).toBe(400)
	})

	it('should return "missing information for client update"', async () => {
		const allClients = await request(baseUrl).get('/clients');
		client = allClients.body[1]	
		delete client.address
		const response = await request(baseUrl).put(`/clients/${client.id}`).send(client)
		expect(response.body.error).toBe('missing information for client update')
	})

	it('should return 201 status code', async () => {
		const allClients = await request(baseUrl).get('/clients');
		client = allClients.body[0]	
		client.nameContact = 'New name Contact'
		client.postalCode = '1111111'
		const response = await request(baseUrl).put(`/clients/${client.id}`).send(client)
		expect(response.statusCode).toBe(201)
	})

	it('should return "client successfully updated"', async () => {
		const allClients = await request(baseUrl).get('/clients');
		client = allClients.body[1]	
		client.nameContact = 'Testing New Name'
		client.country = 'Argentina'
		client.city = 'Buenos Aires'
		const response = await request(baseUrl).put(`/clients/${client.id}`).send(client)
		expect(response.body.msg).toBe('client successfully updated')
	})

})

describe('DELETE /clients', () => {

	const id = 'asfasd13123'

	it('should return 404 status code', async () => {
		const response = await request(baseUrl).delete(`/clients/${id}`)
		expect(response.statusCode).toBe(404)
	})

	it('should return "the user that you want delete not exists" error', async () => {
		const response = await request(baseUrl).delete(`/clients/${id}`)
		expect(response.body.error).toBe('the user that you want delete not exists')
	})


	it('should return 201 status code and must be deleted the client by id', async () => {
		const response = await request(baseUrl).delete(`/clients/${client.id}`)
		expect(response.statusCode).toBe(201)
		expect(response.body.msg).toBe('client successfully deleted')
	})

})

