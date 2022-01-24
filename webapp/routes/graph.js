const express = require('express')
router = express.Router()
graph = require('../controllers/graph')

router.get('/', graph.graph)

module.exports = router