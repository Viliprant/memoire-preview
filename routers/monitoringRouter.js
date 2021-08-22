const express = require('express');
const router = express.Router();

const Monitoring = require('../classes/monitoring')

Monitoring.Init();

router.get('/', function(req, res) {
  res.send('Monitoring API');
});

router.get('/components', function(req, res) {
  res.send(Monitoring.components)
})

module.exports = router;
