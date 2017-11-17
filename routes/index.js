const express = require('express');
const router = express.Router();

router.use('/bot', require('./bot'));
router.use('/team', require('./team'));
module.exports = router;