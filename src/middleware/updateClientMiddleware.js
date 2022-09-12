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

module.exports = updateClient;