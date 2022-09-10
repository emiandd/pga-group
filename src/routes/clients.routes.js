const { Router } = require('express');
const router = Router();


router.get('/clients', (req ,res) => {
	res.send('from /clients!')
})


module.exports = router;