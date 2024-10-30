const express = require('express');
const { startWorkflow } = require('../controllers/workflowController');

const router = express.Router();
router.post('/start-workflow', startWorkflow);

module.exports = router;
