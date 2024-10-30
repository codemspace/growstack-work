const express = require('express');
const { collectUserInput } = require('../controllers/userController');

const router = express.Router();
router.post('/user-input', collectUserInput);

module.exports = router;
